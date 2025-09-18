import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/system/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { RoleModule } from '@/modules/system/role/role.module';
import { LogModule } from '@/modules/system/log/log.module';

@Module({
  imports: [UserModule, AuthModule, MenuModule, RoleModule, LogModule]
})
export class SystemModule {}
