const fs = require('fs');
const path = require('path');
const webpackHotMiddleware = require('webpack-hot-middleware');
const baseDir = process.cwd();

class Helper {
    constructor (webpackConfig) {
        this.webpackConfig = webpackConfig;
        this.baseDir = webpackConfig.baseDir || baseDir;
    }

    getConfig (path, config=this.webpackConfig) {
        const head = path.shift();
        if (path.length === 0) {
            return config[head]
        }
        return this.getConfig(path, config[head]);
    }

    findLoaderIndex (loader) {
        const loaders = this.getConfig(['module', 'rules']);
        return loaders.findIndex(item => item.use.loader === loader);
    }

    // 热加载 配合koa-webpack-dev-middleware，koa-webpack-hot-middleware
    hotDevConfig () {
        const entry = this.getConfig(['entry']);

        // context

        this.webpackConfig.context = this.baseDir;

        // 单入口，入口为app
        entry.app.unshift(
            'babel-polyfill',
            path.join(this.baseDir, '/node_modules/webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&timeout=20000'),
            'react-hot-loader/patch',
        );

        // babel-loader 配置
        const babelOptions = this.getBabelOptions();
        babelOptions.plugins.push('react-hot-loader/babel', 'transform-es2015-modules-commonjs');

        const babelIndex = this.findLoaderIndex('babel-loader');
        this.getConfig(['module', 'rules', babelIndex, 'use']).options = babelOptions;

        return this.webpackConfig;
    }

    getBabelOptions () {
        const babelrc = fs.readFileSync(path.join(this.baseDir + '/.babelrc'));
        return JSON.parse(babelrc);
    }
}

module.exports = Helper;
