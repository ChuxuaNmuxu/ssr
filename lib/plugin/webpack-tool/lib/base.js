class BaseBuilder {
    constructor (webpackConfig, options) {
        const {target} = options;
        this.webpackConfig = require(webpackConfig.webpackEntry[target]);
    }

    create () {
        return this.webpackConfig;
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
}

module.exports = BaseBuilder;