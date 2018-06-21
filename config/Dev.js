'use strict';

const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {


    constructor() {
        super();

        this.config = {
            entry: [
                'babel-polyfill',
                'webpack/hot/only-dev-server',
                'react-hot-loader/patch',
                './index.js'
            ],

            mode: 'development',
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('development'),
                }),
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.ProgressPlugin({

                }),

                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.NamedChunksPlugin()
            ]
        };

        this.config.module.rules = this.config.module.rules.concat([
            {
                test: /^.((?!cssmodule).)*\.(sass|scss)$/,
                loaders: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /^.((?!cssmodule).)*\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ])
    }
}

module.exports = WebpackDevConfig;