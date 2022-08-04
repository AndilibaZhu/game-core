/*
 * @Author: Andy
 * @Date: 2022-04-17 16:44:21
 * @LastEditTime: 2022-07-29 14:23:14
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const logger = new Logger('路由日志');
@Injectable()
//中间件，拦截所有请求，记录请求日志
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path } = req;
    logger.debug(`${method} ${path}`);
    next();
  }
}
