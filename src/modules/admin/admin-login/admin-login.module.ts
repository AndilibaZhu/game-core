/*
 * @Author: Andy
 * @Date: 2022-08-03 15:23:20
 * @LastEditTime: 2022-08-03 15:28:54
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminLoginController } from './admin-login.controller';
import { AdminLoginService } from './admin-login.service';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: JWT_CONSTANT.expiresIn },
    }),
  ],
  controllers: [AdminLoginController],
  providers: [AdminLoginService, JwtStrategy],
})
export class AdminLoginModule {}
