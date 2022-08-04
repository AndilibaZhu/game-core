/*
 * @Author: Andy
 * @Date: 2022-07-26 22:51:05
 * @LastEditTime: 2022-08-04 15:35:44
 */
export interface RequestReturn<T> {
  code: number;
  msg?: string;
  data?: T;
}
export interface ID {
  id: string;
}
