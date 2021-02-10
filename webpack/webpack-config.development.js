const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const commonWebpackConfig = require('./webpack.common.js');
const mockedKroniskSyktBarn = require('../src/mock/mockedKroniskSyktBarn');
const mockedKroniskSyktBarnLost = require('../src/mock/mockedKroniskSyktBarnLost');

const webpackConfig = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
        }),
    ],
});

const devServerOptions = {
    hot: true,
    before(app) {
        mockedKroniskSyktBarn(app);
        mockedKroniskSyktBarnLost(app);
    }
};
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, devServerOptions);
compiler.close(() => console.info('Compiler closed'));

const port = 8088;
devServer.listen(port, 'localhost', (error) => {
    if (error) {
        return console.error(error);
    }
    console.log(`Listening at port ${port}`);
});
