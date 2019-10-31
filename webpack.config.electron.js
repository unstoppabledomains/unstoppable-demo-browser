const webpack = require('webpack');
const path = require('path');

const dev = process.env.ENV === 'dev';

module.exports = {
  entry: './src/electron/index.ts',
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : 'none',
  target: 'electron-main',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  output: {
    filename: 'bundle-electron.js',
    path: path.resolve(__dirname, 'build')
  }
};