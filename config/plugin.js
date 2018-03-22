'use strict';
const path = require('path');

// had enabled by egg
// exports.static = true;
exports.reactssr = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/react-ssr')
};