const path = require('path');



exports.webpackReact = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-webpack-react')
}

exports.webpackTool = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/webpack-tool')
}
