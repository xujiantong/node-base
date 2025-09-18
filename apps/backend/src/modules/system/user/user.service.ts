import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
import {
  UserDto,
  UserPatchDto,
  UserStatus
} from '@/modules/system/user/dto/user.dto';
import { CryptoUtil } from '@/utils/crypto.util';
import { genCreateAudit, genUpdateAudit } from '@/utils/db.util';
import { isEmpty } from 'lodash';
import { PageSearchDto } from '@/common/dto/request';
import { PageDto } from '@/common/dto/response';
import { RoleUserService } from '@/modules/system/role/service/role-user.service';
import { LogService } from '@/modules/system/log/log.service';
import { RoleService } from '@/modules/system/role/role.service';
import { sys_user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private roleUserService: RoleUserService,
    private logService: LogService,
    private roleService: RoleService
  ) {}

  async create(user: UserDto) {
    const isUsernameExist = await this.checkExistUsername(user.username);
    if (isUsernameExist) {
      throw new BizException(Errors.USER_EXIST);
    }
    const isEmailExist = await this.checkExistEmail(user.username);
    if (isEmailExist) {
      throw new BizException(Errors.EMAIL_EXIST);
    }
    const isMobileExist = await this.checkExistMobile(user.mobile);
    if (isMobileExist) {
      throw new BizException(Errors.MOBILE_EXIST);
    }
    user.password = CryptoUtil.encrypt(user.password);
    user = {
      ...user,
      ...genCreateAudit()
    };

    return this.prisma.sys_user.create({
      data: user
    });
  }

  findAll() {
    return this.prisma.sys_user.findMany();
  }
  async findPage(pageSearchDto: PageSearchDto): Promise<PageDto<any>> {
    const { page = 1, size = 10 } = pageSearchDto;
    const where: Record<any, any> = {};
    const total = await this.count(where);
    const users = await this.prisma.sys_user.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      select: {
        id: true,
        username: true,
        nickname: true,
        email: true,
        mobile: true,
        avatar: true,
        status: true,
        gender: true,
        remark: true,
        created_at: true,
        updated_at: true
      },
      orderBy: {
        id: 'desc'
      }
    });
    const list = await this.extendUserRole(users);
    return {
      list,
      total,
      page,
      size
    };
  }
  async extendUserRole(users: Partial<sys_user>[]) {
    let list = [];
    const roles = await this.roleService.findAll();
    const roleDict = roles.reduce((acc, cur) => {
      acc[Number(cur.id)] = cur.name;
      return acc;
    }, {});
    const userIds = users.map((u) => Number(u.id));
    const roleUsers = await this.roleUserService.findByUserIds(userIds);
    list = users.map((u) => {
      const roleIds = roleUsers
        .filter((ru) => ru.user_id === u.id)
        .map((ru) => ru.role_id);
      const roleNames = roleUsers
        .filter((ru) => ru.user_id === u.id)
        .map((ru) => roleDict[String(ru.role_id)])
        .join(',');
      return {
        ...u,
        roleIds: roleIds,
        roleNames: roleNames
      };
    });
    return list;
  }

  findOne(id: number, hidePwd: boolean = true) {
    return this.prisma.sys_user.findUnique({
      where: {
        id
      },
      omit: {
        password: hidePwd
      }
    });
  }

  async update(id: number, updateUserDto: UserPatchDto) {
    const user = await this.findOne(id);
    if (isEmpty(user)) {
      throw new BizException(Errors.USER_NOT_FOUND);
    }
    const patchUser = {
      ...updateUserDto,
      ...genUpdateAudit()
    };
    return this.prisma.sys_user.update({
      where: {
        id
      },
      data: patchUser
    });
  }

  remove(id: number) {
    return this.prisma.sys_user.delete({
      where: {
        id
      }
    });
  }
  count(where: Record<any, any>) {
    return this.prisma.sys_user.count({
      where
    });
  }

  async checkExistUsername(username: string) {
    return this.prisma.sys_user.findFirst({
      where: {
        username
      },
      select: {
        id: true
      }
    });
  }
  async checkExistEmail(email: string) {
    return this.prisma.sys_user.findFirst({
      where: {
        email
      },
      select: {
        id: true
      }
    });
  }
  async checkExistMobile(mobile: string) {
    return this.prisma.sys_user.findFirst({
      where: {
        mobile
      },
      select: {
        id: true
      }
    });
  }
  async findUserByAccount(account: string) {
    return this.prisma.sys_user.findFirst({
      where: {
        AND: {
          status: UserStatus.ENABLED
        },
        OR: [{ username: account }, { email: account }, { mobile: account }]
      }
    });
  }
}
