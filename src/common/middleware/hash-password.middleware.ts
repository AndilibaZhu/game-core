/*
 * @Author: Andy
 * @Date: 2022-04-18 21:52:20
 * @LastEditTime: 2022-04-23 15:54:40
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addSalt, encript } from 'src/utils/Encription';

@Injectable()
//密码加密，调用encryption.ts中的方法,只会在登录时调用
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    if (userPassword) {
      const salt = addSalt();
      userPassword = encript(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    next();
  }
}
