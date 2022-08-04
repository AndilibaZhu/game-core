/*
 * @Author: Andy
 * @Date: 2022-04-18 21:58:48
 * @LastEditTime: 2022-04-23 15:55:28
 */
import * as crypto from 'crypto';
//导出加密算法
export function encript(userPassword: string, salt: string): string {
  return crypto.pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256').toString('base64');
}
//导出加盐算法
export function addSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}
