import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleUserService } from '../role/service/role-user.service';
import { RoleService } from '@/modules/system/role/role.service';
import { LogService } from '@/modules/system/log/log.service';

const provider = [UserService, RoleUserService, RoleService, LogService];

@Module({
  controllers: [UserController],
  providers: [...provider],
  exports: [...provider]
})
export class UserModule {}
