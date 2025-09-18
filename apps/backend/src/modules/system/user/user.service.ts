import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
import { UserDto } from '@/modules/system/user/dto/user.dto';
import { CryptoUtil } from '@/utils/crypto.util';
import { genCreateAudit } from '@/utils/db.util';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

  update(id: number, updateUserDto: any) {
    return '';
  }

  remove(id: number) {
    return this.prisma.sys_user.delete({
      where: {
        id
      }
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
}
