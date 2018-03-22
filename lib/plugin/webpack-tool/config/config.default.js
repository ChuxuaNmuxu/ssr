'use strict';
const path = require('path');
const merge = require('webpack-merge');
const builder = require('../lib');

/**
 * egg-webpack default config
 * @member Config#webpack
 * @property {String} SOME_KEY - some description
 */
module.exports = appInfo => {
    const config = {};

    config.webpack = {
      webpackConfigList: builder.getWebpackConfig()
    }

    return config;
};
