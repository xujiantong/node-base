import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public extended: ReturnType<PrismaClient['$extends']>;
  async onModuleInit() {
    await this.$connect();
  }
  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }
}
