const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'mips-core.js',
    libraryTarget: 'umd',
    library: 'mips-core',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ],
    modules: [
      resolve(__dirname, 'src'),
    ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },
};