const BaseBuilder = require('./base');
const path = require('path');
const fs = require('fs');
const baseDir = process.cwd();
// exports.serverWebpackConfigBulider = baseBuilder(serverWebpackConfig, {loaderEntry: 'server'});

class ClientConfigBuilder extends BaseBuilder {
    constructor (config) {
        super(config, {target: 'client'});
        this.config = config;

        this.init();
    }
    
    init () {
        this.baseDir = this.config.baseDir || this.baseDir;
        this.createHotEntry();
        this.setContext();
        this.setBabelOptions()
    }

    createHotEntry () {
        this.webpackConfig.entry = {
            app: [
                'babel-polyfill',
                path.join(this.baseDir, '/node_modules/webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&timeout=20000'),
                'react-hot-loader/patch',
                this.config.loader.client
            ]
        };
    }

    setContext () {
        this.webpackConfig.context = this.baseDir
    }

    getBabelOptions () {
        const babelrc = fs.readFileSync(path.join(this.baseDir + '/.babelrc'));
        return JSON.parse(babelrc);
    }

    setBabelOptions () {
        // babel-loader 配置
        const babelOptions = this.getBabelOptions();
        babelOptions.plugins.push('react-hot-loader/babel', 'transform-es2015-modules-commonjs');

        const babelIndex = this.findLoaderIndex('babel-loader');
        this.getConfig(['module', 'rules', babelIndex, 'use']).options = babelOptions;
    }
}

module.exports = ClientConfigBuilder;
