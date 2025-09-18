import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
@Injectable()
export class RoleMenuService {
  constructor(private prisma: PrismaService) {}

  async create(roleId: number, menuIds: number[]) {
    // 1. 查询当前已有权限点
    const existingMenus = await this.findByRoleId(roleId);

    const existingMenuIds = existingMenus.map((m) => Number(m.menu_id));

    // 2. 计算新增和删除
    const toAdd = menuIds.filter((id) => !existingMenuIds.includes(id));
    const toRemove = existingMenuIds.filter(
      (id) => !menuIds.includes(Number(id))
    );

    // 3. 使用事务执行批量新增和删除
    await this.prisma.$transaction(async (tx) => {
      if (toAdd.length > 0) {
        await tx.sys_role_menu.createMany({
          data: toAdd.map((menuId) => ({ role_id: roleId, menu_id: menuId }))
        });
      }

      if (toRemove.length > 0) {
        await tx.sys_role_menu.deleteMany({
          where: {
            role_id: roleId,
            menu_id: { in: toRemove }
          }
        });
      }
    });
  }

  // 查询当前角色下的权限点
  async findByRoleId(roleId: number) {
    return await this.prisma.sys_role_menu.findMany({
      where: {
        role_id: roleId
      },
      select: { menu_id: true }
    });
  }
  async remove(menuId: number) {
    return await this.prisma.sys_role_menu.deleteMany({
      where: {
        menu_id: menuId
      }
    });
  }
  // 查询多角色下的权限点
  async findByRoleIds(roleIds: number[]) {
    return await this.prisma.sys_role_menu.findMany({
      where: {
        role_id: { in: roleIds }
      },
      select: { menu_id: true }
    });
  }
}
