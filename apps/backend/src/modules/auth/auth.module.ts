import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeyPaths, ISecurityConfig } from '@/config';
import { isDev } from '@/utils/env';
import { UserModule } from '@/modules/system/user/user.module';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
const providers = [AuthService];
const strategies = [LocalStrategy, JwtStrategy, JwtAuthGuard];
@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const { jwtSecret, jwtExprire } =
          configService.get<ISecurityConfig>('security');

        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExprire}s`
          },
          ignoreExpiration: isDev
        };
      },
      inject: [ConfigService]
    }),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [...providers, ...strategies],
  exports: [...providers]
})
export class AuthModule {}
