/*
 * @Author: Andy
 * @Date: 2022-04-19 14:06:57
 * @LastEditTime: 2022-07-18 15:37:38
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    //这边的roles是一个数组，可以是多个角色，比如['admin','user']，是在controller的@Role装饰器中指定的
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    //没啥好看的，就这边权限要从请求里面获取，准确的是请求被jwt解析后，加入了请求头的user里面获取
    const role = request.user.role;
    if (roles.indexOf(role) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
