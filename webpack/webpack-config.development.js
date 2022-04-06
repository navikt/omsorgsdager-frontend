const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const commonWebpackConfig = require('./webpack.common.js');

const webpackConfig = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
        }),
    ],
});
const port = 8088;

const devServerOptions = {
    hot: true,
    port,
};

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(devServerOptions, compiler);
compiler.close(() => console.info('Compiler closed'));

devServer.startCallback((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Listening at port ${port}`);
    }
});