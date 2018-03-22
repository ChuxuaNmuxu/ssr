// const WEBPACK = Symbol('application#webpack');
const constant = require('../../lib/constant');

module.exports = {
    // get webpack () {
    //     if (!this[WEBPACK]) {
    //         this[WEBPACK] = {
    //             webpackConfigList: webpack
    //         };
    //     }

    //     return this[WEBPACK];
    // },
    
    get constant () {
        return constant;
    }
}