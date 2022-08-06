/*
 * @Author: Andy
 * @Date: 2022-08-06 10:58:54
 * @LastEditTime: 2022-08-06 16:02:43
 */
import { createClient } from 'oicq';
import { AppConfig } from '../../config';
const account = AppConfig.qqMsg.account;
const password = AppConfig.qqMsg.password;
const client = createClient(account);

export const qqMsgLogin = async () => {
  if (AppConfig.qqMsg.method === 'password') {
    client
      .on('system.login.slider', function () {
        console.log('输入ticket：');
        process.stdin.once('data', (ticket) => this.submitSlider(String(ticket).trim()));
      })
      .login(password)
      .then(() => {
        console.log('Logged in!');
      });
  } else if (AppConfig.qqMsg.method === 'scan') {
    client
      .on('system.login.qrcode', function () {
        //扫码后按回车登录
        process.stdin.once('data', () => {
          this.login();
        });
      })
      .login()
      .then(() => {
        console.log('Logged in!');
      });
  }
  client.on('system.online', () => console.log('Logged in!'));
  client.on('message', (e) => {
    console.log(e);
    e.reply('hello world', true); //true表示引用对方的消息
  });
};
if (AppConfig.qqMsg.enable) {
  qqMsgLogin();
}
export const qqMsg = client;
