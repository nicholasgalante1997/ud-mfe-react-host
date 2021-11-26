const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const common = require('./webpack.common.js');
const packageJson = require('../../package.json');

const dev = {
    mode: 'development',
    devServer: {
        port: 4000,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',
            remotes: {
                'marketing': 'marketing@http://localhost:4001/remoteEntry.js'
            },
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(common, dev);