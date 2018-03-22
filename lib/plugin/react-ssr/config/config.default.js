'use strict';
const path = require('path');

module.exports = app => {
  const config = {};

  config.view = {
    mapping: {
      '.js': 'react',
      '.jsx': 'react',
      '.html': 'react'
    },
  };

  return config;
};

