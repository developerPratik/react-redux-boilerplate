'use strict';

/**
 * Dist configuration for the production build
 */


const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const ROOT = path.resolve(__dirname, '../');
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

class WebpackDistConfig extends WebpackBaseConfig {

    constructor() {
        super();
        this.config = {
            cache: false,
            devtool: 'source-map',
            entry: [
                'babel-polyfill',
                './index.js'
            ],
            output: {
                path: root('dist'),
                publicPath: '',
                filename: 'assets/app.js',
                chunkFilename: 'assets/[id].[hash].chunk.js',
                devtoolModuleFilenameTemplate: info =>
                    path.
                        relative('src', info.absoluteResourcePath)
                        .replace(/\\/g, '/')
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"production"'
                }),
                new webpack.optimize.AggressiveMergingPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new CopyWebpackPlugin([
                    { from: root('public/index.html'), to: root('dist/') },
                    { from: root('public/assets/favicon.ico'), to: root('dist/assets') },
                    { from: root('public/assets/style.css'), to: root('dist/assets') }
                ])
            ]

        };
        

        this.config.devServer.hot = false;
        this.config.performance.hints = false;

        this.config.module.rules = this.config.module.rules.concat([
            {
                test: /^.((?!cssmodule).)*\.(sass|scss)$/,
                loaders: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }, {
                test: /^.((?!cssmodule).)*\.less$/,
                loaders: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ])
    }

    get env() {
        return 'dist';
    }
}

module.exports = WebpackDistConfig;