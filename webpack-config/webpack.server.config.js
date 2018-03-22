const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const baseDir = process.cwd();

const serverConfig = {
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css']
    },

    output: {
        path: path.resolve(baseDir, './app/view/home'),
        publicPath: '/',
        filename: '[name].js',
        libraryTarget: 'commonjs2'
        // chunkFilename: 'id.chunk.js'
    },

    node: {
        __filename: false,
        __dirname: false
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
        })
    ],
    target: 'node',
    externals: [nodeExternals()]
}

module.exports = serverConfig;
