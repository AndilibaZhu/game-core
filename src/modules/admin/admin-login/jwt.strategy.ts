/*
 * @Author: Andy
 * @Date: 2022-04-20 00:28:30
 * @LastEditTime: 2022-08-03 16:30:56
 */
/*
 * @Author: Andy
 * @Date: 2022-04-19 15:47:34
 * @LastEditTime: 2022-04-20 00:26:59
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from './jwt.constant';
import { User } from 'src/interface/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }

  async validate(payload: User): Promise<User> {
    const user = payload;
    return user;
  }
}
