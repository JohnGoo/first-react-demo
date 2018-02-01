const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const PORT = 3010

function join(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/#/`,
        }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: join('./src'),
        historyApiFallback: false,
        hot: true,
        host: '0.0.0.0',
        port: PORT,
    },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)