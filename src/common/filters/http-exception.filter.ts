/*
 * @Author: Andy
 * @Date: 2022-04-17 16:44:21
 * @LastEditTime: 2022-07-26 15:36:34
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
const logger = new Logger('拦截的请求');
//http拦截器，把拦截的异常的返回重写
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    //console.log(exception);
    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
    logger.warn(`${request.method} ${request.url}`);
  }
}
