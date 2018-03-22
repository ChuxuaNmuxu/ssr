/**
 * 获取项目根目录项的webpack配置
 */
const util = require('util');
const path = require('path');
const merge = require('webpack-merge');
const fs = require('fs');
const baseDir = process.cwd();

exports.getBuildConfig = (config={}, option={}) => {
    const filepath = path.join(config.baseDir || baseDir, option.path || 'webpack.config.js');
    if (fs.existsSync(filepath)) return merge({baseDir}, require(filepath), config);

    return merge({baseDir}, config);
}

exports.getWebpackConfig = (config={}, builder, option={}) => {
    const builderConfig = exports.getBuildConfig();
    const webpackConfigList = [];

    builders = util.isArray(builder) ? builder : [builder];

    builders.forEach(Build => {
        webpackConfigList.push(new Build(builderConfig).create());
    })

    return webpackConfigList;
}
