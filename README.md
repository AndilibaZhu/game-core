<!--
 * @Author: Andy
 * @Date: 2022-07-26 21:52:56
 * @LastEditTime: 2022-08-06 15:21:12
-->
## 用nest.js做后端的一个小游戏
### 技术栈：
- [nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
### 简介：
- 在nest.js中使用TypeScript和MongoDB来实现一个小游戏，并使用Redis来预防并发。
- 主要实现是用nest.js 的websocket (socket.io),来做游戏的主要通讯，前端在另一个仓库，地址：
- 游戏的后台管理在目录下/modules/admin内，用http协议。后期会增加ws的实时游戏状态支持。
- 本人业余开发，不定期更新。也有可能鸽了,如果有任何建议、优化，欢迎issue探讨
## 目录解析：
- /src 程序目录
```
.
├── common
│   ├── filters # 公共过滤器
│   ├── guard # 公共守卫
│   └── middleware # 公共中间件
├── db # 数据库模块
├── game # 游戏常用函数
├── interface # 类型文件夹（mongo数据库定义）
│   └── adminInterface # 管理后台（类型定义）
├── modules
│   ├── admin # 管理后台模块
│   │   ├── admin-equips # 管理后台装备模块
│   │   ├── admin-goods # 管理后台物品模块
│   │   └── admin-login   # 管理后台登录模块
│   ├── login # 游戏登录模块
│   ├── wsconnect # websocket连接模块
│   └── wstest # websocket测试模块（测试发现，一个WS链接绑定两个event，会同时触发）
└── utils # 工具函数
    └── is
```
## 小功能：
- 内建了QQ群绑定功能，实现后端和QQ群交互，用了[oicq](https://github.com/takayama-lily/oicq)的库，可以去看一下API
- config 文件SampleConfig.ts 需要重命名为config.ts，里面定义数据库，QQ号等信息
## 常用命令：
```
命令	效果
nest g resource src/名	创建完整模块
nest g controller src/名	建立控制器
nest g service src/名	创建服务器
nest g module src/名	创建模块
nest g guard guard/名	创建守卫
nest g interceptor interceptor/transform	创建拦截器
nest g filter filter/http-exception	创建异常过滤器
nest g middleware middleware/logge	创建中间件

nest g co admin-equips
nest g service admin-equips
nest g mo admin-equips
```