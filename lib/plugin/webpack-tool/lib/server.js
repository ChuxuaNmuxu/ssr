const BaseBuilder = require('./base');
// exports.serverWebpackConfigBulider = baseBuilder(serverWebpackConfig, {loaderEntry: 'server'});

class ServerConfigBuild extends BaseBuilder {
    constructor (config) {
        super(config, {target: 'server'});
        this.config = config;

        this.init();
    }

    init () {
        this.createEntry()
    }

    createEntry () {
        this.webpackConfig.entry = {
            app: [this.config.loader.server]
        }
    }
}

module.exports = ServerConfigBuild;
