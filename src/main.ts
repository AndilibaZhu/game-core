/*
 * @Author: Andy
 * @Date: 2022-07-24 16:04:06
 * @LastEditTime: 2022-07-29 14:33:19
 */
declare const module: any;

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WsExceptionFilter } from './common/filters/ws-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
const logger = new Logger('main.ts');
const bootstrap = async () => {
  // 创建应用实例并配置跨域
  const app = await NestFactory.create(AppModule, { cors: true });
  //增加全局前缀
  app.setGlobalPrefix('api');
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new WsExceptionFilter());
  // 全局使用中间件
  app.use(new LoggerMiddleware().use);
  app.useLogger(app.get(Log4jsLogger));

  await app.listen(process.env.SERVER_PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

bootstrap().then(() => {
  logger.log('服务启动成功，端口:' + process.env.SERVER_PORT);
});
