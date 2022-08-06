/*
 * @Author: Andy
 * @Date: 2022-07-29 13:09:40
 * @LastEditTime: 2022-08-06 15:31:25
 */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'), // 目录快捷方式配置
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'], //以上文件引入可以省略后缀名
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
