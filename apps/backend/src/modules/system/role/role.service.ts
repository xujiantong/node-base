import { Injectable } from '@nestjs/common';
import {
  RoleCreateOrPatchDto,
  RoleQueryDto
} from '@/modules/system/role/dto/index.dto';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: RoleCreateOrPatchDto) {
    return this.prisma.sys_role.create({
      data: createRoleDto
    });
  }

  async findAll() {
    return this.prisma.sys_role.findMany();
  }
  async findPaginated(query: RoleQueryDto) {
    const { page = 1, size = 10, code, name, status } = query;
    const where: Record<any, any> = {};
    if (name) {
      where.name = { contains: name, mode: 'insensitive' }; // 模糊匹配
    }
    if (code) {
      where.code = { contains: code, mode: 'insensitive' }; // 模糊匹配
    }
    if (status || status === 0) {
      where.status = status;
    }

    const total = await this.count(where);
    const list = await this.prisma.sys_role.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: {
        id: 'desc'
      }
    });
    return {
      list,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size)
    };
  }

  async findOne(id: number) {
    return this.prisma.sys_role.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateRoleDto: RoleCreateOrPatchDto) {
    const isExist = await this.checkExist(id);
    if (!isExist) {
      throw new BizException(Errors.USER_NOT_FOUND);
    }
    return this.prisma.sys_role.update({
      where: {
        id
      },
      data: updateRoleDto
    });
  }

  async remove(id: number) {
    const isExist = await this.checkExist(id);
    if (!isExist) {
      throw new BizException(Errors.USER_NOT_FOUND);
    }
    // 查询是否存在分配的角色和菜单权限
    // 策略1: 全部删除
    // 策略2: 提示用户修改后删除
    return this.prisma.sys_role.delete({
      where: {
        id
      }
    });
  }
  async checkExist(id: number) {
    return Boolean(
      await this.prisma.sys_role.findUnique({
        where: {
          id
        }
      })
    );
  }

  async count(where) {
    return this.prisma.sys_role.count({ where });
  }
}
