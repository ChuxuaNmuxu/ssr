'use strict'

const constant = require('./lib/constant');

module.exports = app => {

    // 通知agent开始构建webpack
    app.ready(() => {
        app.messenger.sendToAgent(constant.EVENT_WEBPACK_BUILD, data => {
            app.webpack.build_state = data.state;
        });
    })
}
