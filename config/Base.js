'use strict';

const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const npmBase = path.join(__dirname, '../../node_modules');


class WebpackBaseConfig {

    constructor() {
        this._config = {};
    }

    get includedPackages() {
        return [].map((pkg) => fs.realpathSync(path.join(npmBase.pkg)));
    }

    get config() {
        return this._config
    }


    set config(data) {
        this._config = Object.assign({}, this.defaultSettings, data);
        return this._config;

    }


    get env() {
        return 'dev';
    }

    get srcPathAbsolute() {
        return path.resolve('./src');
    }

    get defaultSettings() {

        const cssModulesQuery = {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]-[local]-[hash:base64:5]'
        };

        return {
            context: this.srcPathAbsolute,
            devtool: 'eval',
            devServer: {
                contentBase: ['./public/', './src/'],
                publicPath: '/assets/',
                historyApiFallback: true,
                hot: true,
                inline: true,
                port: 3000
            },

            entry: './index.js',
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /\.js?$/,
                        include: this.srcPathAbsolute,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react', 'stage-2']
                        }

                    },
                    {
                        test: /^.((?!cssmodule).)*\.css$/,
                        loaders: [
                            { loader: 'style-loader' },
                            { loader: 'css-loader' }
                        ]
                    },
                    {
                        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot|ico)$/,
                        loader: 'file-loader'
                    },
                    {
                        test: /^.((?!cssmodule).)*\.styl$/,
                        loaders: [
                            { loader: 'style-loader' },
                            { loader: 'css-loader' },
                            { loader: 'stylus-loader' }
                        ]
                    },
                    {
                        test: /\.json$/,
                        loader: 'json-loader'
                    },
                    {
                        test: /\.cssmodule\.(sass|scss)$/,
                        loaders: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                query: cssModulesQuery
                            },
                            { loader: 'sass-loader' }
                        ]
                    },
                    {
                        test: /\.cssmodule\.css$/,
                        loaders: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                query: cssModulesQuery
                            }
                        ]
                    },
                    {
                        test: /\.cssmodule\.less$/,
                        loaders: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                query: cssModulesQuery
                            },
                            { loader: 'less-loader' }
                        ]
                    },
                    {
                        test: /\.cssmodule\.styl$/,
                        loaders: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                query: cssModulesQuery
                            },
                            { loader: 'stylus-loader' }
                        ]
                    }, {
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true
                            }
                        }
                    },

                ]
            },
            output: {
                path: path.resolve('./dist/assets'),
                filename: 'app.js',
                publicPath: './assets/'
            },
            performance: {
                hints: false
            },
            plugins: [
                new ExtractTextPlugin('styles.css')
            ]

        };
    }
}

module.exports = WebpackBaseConfig;
