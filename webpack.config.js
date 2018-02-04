const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'src/client/public/dist');
const APP_DIR = path.resolve(__dirname, 'src/client/app');
const HTML_TEMPLATE = path.resolve(__dirname, 'src/client/public/html/index.html');
const IMAGES_PATH = path.resolve(__dirname, 'src/client/public/images');

const config = {
    entry:{
        app: [
            APP_DIR + '/index.jsx'
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    module : {
        rules : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                use : 'babel-loader'
            },
            {
                test: /\.(woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: HTML_TEMPLATE
        }),
        new ExtractTextPlugin("[name].css"),
        new FaviconsWebpackPlugin({
            logo: IMAGES_PATH + "/trustbot.jpg",
            icons: {
                favicons: true,
                firefox: true
            }
        })
    ],
    devtool: 'source-map'
};

module.exports = config;