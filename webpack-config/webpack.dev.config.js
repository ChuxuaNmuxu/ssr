const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const baseDir = process.cwd();

const serverConfig = {
    entry: {
        app: [
            'babel-polyfill',
            // path.join(baseDir, '/node_modules/webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&timeout=20000'),
            'webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&timeout=20000',
            'react-hot-loader/patch',
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css']
    },

    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: '[name].js',
        // chunkFilename: 'id.chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|libs)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web'
}

module.exports = serverConfig;