const path = require('path');
const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const { ifDevelopment, ifProduction } = getIfUtils(nodeEnv);

module.exports = removeEmpty({
  entry: ['./app/main.js'],

  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.js/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  devtool: ifDevelopment('eval-source-map', 'source-map'),

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    stats: 'normal'
  },

  plugins: removeEmpty([
    new ExtractTextPlugin('[name]-bundle.css')
  ]),
});