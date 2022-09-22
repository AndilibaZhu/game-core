/*
 * @Author: Andy
 * @Date: 2022-07-27 21:14:02
 * @LastEditTime: 2022-09-21 22:03:59
 */
//生成指定范围整数随机数
export const randomNum = (min: number, max: number) => {
  const Range = max - min;
  const Rand = Math.random();
  const num = min + Math.round(Rand * Range); //四舍五入
  return num;
};
