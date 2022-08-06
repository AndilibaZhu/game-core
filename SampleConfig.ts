/*
 * @Author: Andy
 * @Date: 2022-07-26 22:22:20
 * @LastEditTime: 2022-08-06 16:11:19
 */
export const AppConfig = {
  port: 3000,
  db: {
    uri: 'mongodb://127.0.0.1:27017/webgame',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  qqMsg: {
    account: 1234567890,
    password: 'hello',
    enable: true,
    method: 'password', //扫二维码需要在统一网络下使用，可以选择密码登录，但有些账号密码登录不可以（scan/password）
  },
};
