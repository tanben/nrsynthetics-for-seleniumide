// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VersionFilePlugin = require('webpack-version-file-plugin');
const autoprefixer = require('autoprefixer')
const packageVersion = require("./package.json").version;

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: isProduction ? 'source-map' : 'cheap-eval-source-map',
  entry: {
    content: ["./content"],
    background: ['./background'],
  },
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    filename: '[name].js',
    publicPath: '/assets/',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],

  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },

          // Process JS with Babel.
          {
            test: /\.(jsx?)$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            use: [
              {
                loader: "babel-loader",
                options: {
                  compact: true
                }
              }
            ]
          },

          {
            loader: 'file-loader',
            exclude: [/\.jsx?$/, /\.html$/, /\.json$/],
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [

        new webpack.NamedModulesPlugin(),

        new VersionFilePlugin({
            packageFile: path.resolve(__dirname, './package.json'),
            template: path.resolve(__dirname, './src/manifest.json'),
            outputFile: path.resolve(__dirname, './build/manifest.json')
        }),


        new CopyWebpackPlugin([
          { from: "icons", to: "../icons" }
        ]),
        new webpack.DefinePlugin({
          "process.env": {
            "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "SIDE_ID": JSON.stringify('mooikfkahbdckldjjndioackbalphokd'),
            "CODE_VERSION": JSON.stringify(packageVersion)

          }
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]

}
