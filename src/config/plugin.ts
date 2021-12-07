/*
 * @Description: 
 * @Author: yivi
 * @Date: 2021-12-05 13:47:05
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-07 14:54:13
 */
import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: false,
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  }
} as EggPlugin;
