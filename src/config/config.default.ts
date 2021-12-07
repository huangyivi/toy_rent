/*
 * @Description: 
 * @Author: yivi
 * @Date: 2021-12-05 13:47:05
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-07 14:54:51
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1638683225678_2567';

  // add your config here
  config.middleware = ['reportMiddleware'];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.security = {
  //   csrf: false,
  // };
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '843702140',
      database: 'toy_rental',
    },
    app: true,
    agent: false,
  };


  config.cors = {
    origin: "*",
    allowMethods: "*"
  }
  return config;
};
