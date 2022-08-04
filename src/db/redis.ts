/*
 * @Author: Andy
 * @Date: 2022-07-26 14:56:00
 * @LastEditTime: 2022-07-26 16:34:21
 */
import Redis from 'ioredis';
import { Logger } from '@nestjs/common';
const logger = new Logger('redis');
const redisint = () => {
  const redis = new Redis({ port: 6379, host: 'localhost' });
  redis.on('error', (err) => logger.log('Redis cluster Error', err));
  redis.on('connect', () => logger.log('redis连接成功'));
  return redis;
};
export const redis = redisint();
