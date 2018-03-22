exports.WebpackClientBuilder = require('./client');
exports.WebpackServerBuilder = require('./server');
exports.WebpackBuilder = require('./builder');

exports.getWebpackConfig = (config, option) => {
  return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackClientBuilder, exports.WebpackServerBuilder], option);
};
exports.getWebWebpackConfig = (config = {}, option = {}) => {
  return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackClientBuilder], option);
};

exports.getNodeWebpackConfig = (config = {}, option = {}) => {
  return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackServerBuilder], option);
};
