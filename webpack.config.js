/**
 * webpack 配置文件
 * loader: 客户端和服务端入口模板文件
 */
const path = require('path');

const config = {
    entry: {
        app: [path.resolve(__dirname, './app/web/page/home')]
    },

    loader: {
        client: path.join(__dirname, './app/web/framework/entry/client.js'),
        server: path.join(__dirname, './app/web/framework/entry/server.js'),
    },

    webpackEntry: {
        client: path.join(__dirname, './webpack-config/webpack.dev.config.js'),
        server: path.join(__dirname, './webpack-config/webpack.server.config.js'),
    }

}

module.exports = config;
