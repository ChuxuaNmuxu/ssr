const webpack = require('webpack');
const constant = require('./constant');
const Koa = require('koa');
const cors = require('kcors');
const Utils = require('./utils');
const merge = require('webpack-merge');

class WebpackServer {
    constructor (agent, config) {
        this.agent = agent;
        this.config = config;

        this.config = merge({
            port: 9000,
            debugPort: 8888,
            hot: false
        }, config);
    }

    start () {
        const compilers = [];
        this.config.webpackConfigList.forEach((webpackConfig, index) => {
            const compiler = webpack([webpackConfig]);

            this.createWebpackServer(compiler, {
                hot: webpackConfig.target !== 'node',
                port: this.config.port + index,
                publicPath: webpackConfig.output.publicPath,
            });
            compilers.push(compiler);
        })

        this.listen(compilers);
    }

    createWebpackServer (compiler, {port=7000, hot, publicPath, target='node'}) {
        const app = new Koa();
        app.use(cors());
    
        if (compiler) {
          const devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
            publicPath,
            stats: {
                colors: true,
                children: true,
                modules: false,
                chunks: false,
                chunkModules: false
            },
            watchOptions: {
                ignored: /node_modules/,
            }
          });
    
          app.use(devMiddleware);
    
          if (hot === undefined || hot) {
            const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
                log: false,
                reload: true
            });
            app.use(hotMiddleware);
          }
        } else {
            app.use(serve(process.cwd()));
        }
    
        app.listen(port, err => {
          if (!err && compiler) {
            const ip = Utils.getIp();
            const url = `http://${ip}:${port}`;
            if(target){
                console.info(`\r\n [webpack-tool] start webpack ${target} building server: ${url}`);
            } else {
                console.info(`\r\n [webpack-tool] start webpack building server: ${url}`);
            }
          }
        });
    }

    checkBuildState () {

    }

    listen (compilers) {
        this.agent.messenger.on(constant.READ_FILE_MEMORY, ({filePath, fileName, target='node'}) => {
            const fileContent = Utils.readWebpackMemoryFile(compilers, filePath, fileName);

            this.agent.messenger.sendToApp(constant.READ_FILE_MEMORY_CONTENT, {
                fileContent,
                filePath
            })
        })
    }
}

module.exports = WebpackServer;
