/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1621418116000_6762';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.bodyParser = {
    // enable: true,
    // formLimit: '300mb',
    jsonLimit: '300mb',
    // textLimit: '300mb',
    // strict: true,
    // // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    // queryString: {
    //   arrayLimit: 10000,
    //   depth: 50,
    //   parameterLimit: 100000,
    // }
  };

  config.cors = {
    origin: '*', allowMethods: 'GET,PUT,POST,DELETE'
  };

  return {
    ...config,
    ...userConfig,
  };
};


