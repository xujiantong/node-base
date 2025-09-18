import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';

@Injectable()
export class RoleUserService {
  constructor(private prisma: PrismaService) {}
  // 创建角色用户关系
  async create(roleId: number, userIds: number[]) {
    // 1. 查询当前角色已有的用户
    const existingUsers = await this.findByRoleId(roleId);
    const existingUserIds = existingUsers.map((u) => Number(u.user_id));
    // 2. 计算新增和删除
    const toAdd = userIds.filter((id) => !existingUserIds.includes(id));
    const toRemove = existingUserIds.filter((id) => !userIds.includes(id));

    await this.prisma.$transaction(async (tx) => {
      if (toAdd.length > 0) {
        await tx.sys_user_role.createMany({
          data: toAdd.map((userId) => ({ role_id: roleId, user_id: userId }))
        });
      }
      if (toRemove.length > 0) {
        await tx.sys_user_role.deleteMany({
          where: {
            role_id: roleId,
            user_id: { in: toRemove }
          }
        });
      }
    });
  }

  // 查询当前角色下的用户
  async findByRoleId(roleId: number) {
    return this.prisma.sys_user_role.findMany({
      where: {
        role_id: roleId
      },
      select: { user_id: true }
    });
  }
  async remove(userId: number) {
    return this.prisma.sys_user_role.deleteMany({
      where: {
        user_id: userId
      }
    });
  }
  async findByUserIds(ids: number[]) {
    return this.prisma.sys_user_role.findMany({
      where: {
        user_id: { in: ids }
      }
    });
  }
  async findByUserId(userId: number) {
    return this.prisma.sys_user_role.findMany({
      select: {
        role_id: true
      },
      where: {
        user_id: userId
      }
    });
  }
}
