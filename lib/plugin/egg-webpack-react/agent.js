const WebpackServer = require('./lib/server');

module.exports = agent => {
    // 所有进程启动后
    agent.messenger.on('egg-ready', () => {
        const config = agent.config.webpack;

        agent.messenger.setMaxListeners(config.maxListeners || 10000);

        const {webpackConfigList} = config;
        if (webpackConfigList && !Array.isArray(webpackConfigList)) {
            config.webpackConfigList = [webpackConfigList];
        }

        new WebpackServer(agent, config).start();
    })
}