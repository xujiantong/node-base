import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleMenuService } from '@/modules/system/role/service/role-menu.service';
import { RoleUserService } from '@/modules/system/role/service/role-user.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleMenuService, RoleUserService],
  exports: [RoleMenuService, RoleUserService]
})
export class RoleModule {}
