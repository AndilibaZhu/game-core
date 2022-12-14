/*
 * @Author: Andy
 * @Date: 2022-07-27 14:27:12
 * @LastEditTime: 2022-09-21 23:20:20
 */
//引入mongoose模块

import { Monster, MonsterUnit } from 'src/interface/monster.interface';
import { UserInfo } from 'src/interface/userInfo.interface';
import { City, MapUnits } from '../interface/city.interface';

const wsSidMap = new Map();
const CITIESDATA: Map<string, City> = new Map();
const USERINFODATA: Map<string, UserInfo> = new Map();
const MONSTERDATA: Map<string, Monster> = new Map();
const MAPUNITDATA: { [cityID: string]: Map<string, MonsterUnit | MapUnits> } = {};
const staticData = {
  expRequire: [
    -50, 10, 130, 370, 790, 1450, 2410, 3730, 5470, 7690, 10450, 13810, 17830, 22570, 28090, 34450, 41710, 49930, 59170, 69490, 80950, 93610, 107530, 122770, 139390, 157450, 177010, 198130, 220870, 245290, 271450,
    299410, 329230, 360970, 394690, 430450, 468310, 508330, 550570, 595090, 641950, 691210, 742930, 797170, 853990, 913450, 975610, 1040530, 1108270, 1178890, 1252450, 1329010, 1408630, 1491370, 1577290, 1666450,
    1758910, 1854730, 1953970, 2056690,
  ], //10*(i*i*i+5*i)-50
};
export default { wsSidMap, staticData, CITIESDATA, USERINFODATA, MAPUNITDATA, MONSTERDATA };
