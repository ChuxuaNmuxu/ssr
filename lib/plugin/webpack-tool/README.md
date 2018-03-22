# egg-webpack-tool

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-webpack-tool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-webpack-tool
[travis-image]: https://img.shields.io/travis/eggjs/egg-webpack-tool.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-webpack-tool
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-webpack-tool.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-webpack-tool?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-webpack-tool.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-webpack-tool
[snyk-image]: https://snyk.io/test/npm/egg-webpack-tool/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-webpack-tool
[download-image]: https://img.shields.io/npm/dm/egg-webpack-tool.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-webpack-tool

<!--
Description here.
-->

## Install

```bash
$ npm i egg-webpack-tool --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.webpackTool = {
  enable: true,
  package: 'egg-webpack-tool',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.webpackTool = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
