import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { RoleMenuService } from '@/modules/system/role/service/role-menu.service';
import { RoleUserService } from '../role/service/role-user.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, RoleMenuService, RoleUserService]
})
export class MenuModule {}
