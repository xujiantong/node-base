import { PrismaService } from '@/shared/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  MenuCreateOrPatchDto,
  MenuDto,
  MenuUpdateLevelDto
} from './dto/index.dto';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
import { RoleUserService } from '@/modules/system/role/service/role-user.service';
import { RoleMenuService } from '@/modules/system/role/service/role-menu.service';
@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private roleMenuService: RoleMenuService,
    private roleUserService: RoleUserService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async create(createMenuDto: MenuCreateOrPatchDto) {
    // 创建 sys_menu
    return this.prisma.sys_menu.create({
      data: createMenuDto
    });
  }

  async findAll() {
    return this.prisma.sys_menu.findMany({
      // 根据 id 排序, sort 降序
      orderBy: [{ sort: 'asc' }, { id: 'asc' }]
    });
  }
  async findMenuDynamic() {
    const { uid } = this.request['user'];
    // 获取当前用户的角色
    const roleIds = await this.roleUserService.findByUserId(uid);
    const ids = roleIds.map((item) => Number(item.role_id));
    // 获取当前用户的权限点
    const menuIds = await this.roleMenuService.findByRoleIds(ids);
    // in 操作
    return this.prisma.sys_menu.findMany({
      // 根据 id 排序, sort 降序
      where: {
        id: { in: menuIds.map((item) => Number(item.menu_id)) }
      },
      orderBy: [{ sort: 'asc' }, { id: 'asc' }]
    });
  }

  menusToTree(menus: MenuDto[]) {
    const tree: MenuDto[] = [];
    const menuMap = new Map<number, MenuDto>();

    // 将菜单初始化到 Map 中
    menus.forEach((menu) => {
      menuMap.set(menu.id, {
        ...menu,
        children: []
      });
    });

    // 构建树
    menuMap.forEach((menu) => {
      if (menu.parent_id === 0) {
        tree.push(menu);
      } else {
        const parent = menuMap.get(menu.parent_id);
        if (parent) {
          parent.children.push(menu);
        }
      }
    });

    return tree;
  }

  async findOne(id: number) {
    return await this.prisma.sys_menu.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateMenuDto: MenuCreateOrPatchDto) {
    const isExist = await this.prisma.sys_menu.findUnique({
      where: {
        id
      }
    });
    if (!isExist) {
      throw new BizException(Errors.DATA_NOT_FOUND);
    }
    return this.prisma.sys_menu.update({
      where: {
        id
      },
      data: updateMenuDto
    });
  }

  async remove(id: number) {
    const isExist = await this.prisma.sys_menu.findUnique({
      where: {
        id
      }
    });
    if (!isExist) {
      throw new BizException(Errors.DATA_NOT_FOUND);
    }
    // 查询是否有子节点
    const children = await this.prisma.sys_menu.findMany({
      where: {
        parent_id: id
      }
    });
    if (children.length > 0) {
      throw new BizException(Errors.NODE_HAS_CHILDREN);
    }

    return this.prisma.$transaction(async (tx) => {
      await this.prisma.sys_menu.delete({
        where: {
          id
        }
      });
      await this.roleMenuService.remove(id);
    });
  }

  async sort(ids: number[]) {
    await this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.sys_menu.update({
          where: { id },
          data: { sort: index }
        })
      )
    );
    return ids;
  }
  async updateLevel(menuUpdateLevelDto: MenuUpdateLevelDto) {
    const { id, parent_id } = menuUpdateLevelDto;
    return this.prisma.sys_menu.update({
      where: {
        id
      },
      data: {
        parent_id
      }
    });
  }
}
