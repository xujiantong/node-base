import { Inject, Injectable } from '@nestjs/common';
import { LogDto, LogStatus, LogType } from '@/modules/system/log/dto/log.dto';
import { REQUEST } from '@nestjs/core';
import { PageDto } from '@/common/dto/response';
import { PageSearchDto } from '@/common/dto/request';
import { genCreateAudit } from '@/utils/db.util';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { UserDto } from '@/modules/system/user/dto/user.dto';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async page(query: PageSearchDto) {
    const { page = 1, size = 10, ...rest } = query;
    const where: Record<any, any> = {};
    if (rest) {
      Object.assign(where, rest);
    }
    const total = await this.count(where);
    const list = await this.prisma.sys_log.findMany({
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
  async saveUserLog(before: UserDto | null, after: UserDto | null) {
    return this.prisma.sys_log.create({
      data: {
        type: LogType.USER,
        target_id: after === null ? before.id : after.id,
        old_value: before ? JSON.stringify(before) : null,
        new_value: after ? JSON.stringify(after) : null,
        status: LogStatus.UNRECOVERED,
        ...genCreateAudit()
      }
    });
  }

  async count(where: Record<any, any>) {
    return this.prisma.sys_log.count({ where });
  }
}
