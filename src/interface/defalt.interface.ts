/*
 * @Author: Andy
 * @Date: 2022-07-26 22:51:05
 * @LastEditTime: 2022-08-11 16:53:38
 */
export interface RequestReturn<T> {
  code: number;
  msg?: string;
  data?: T;
}
export interface ID {
  id: string;
}
export interface PageReturn<T> {
  pageNo: number;
  pageSize: number;
  total: number;
  records: T;
}
