/*
 * @Author: Andy
 * @Date: 2022-07-27 23:11:22
 * @LastEditTime: 2022-07-27 23:12:40
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class WstestService {
  create() {
    return 'This action adds a new wstest';
  }

  findAll() {
    return `This action returns all wstest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wstest`;
  }

  update(id: number) {
    return `This action updates a #${id} wstest`;
  }

  remove(id: number) {
    return `This action removes a #${id} wstest`;
  }
}
