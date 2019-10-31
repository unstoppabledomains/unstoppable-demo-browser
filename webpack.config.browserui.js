const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.ENV === 'dev';

config = {
  entry: {},
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : 'none',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['file-loader'],
      },
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
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `[name].bundle.js`
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    port: 3001 // Specify a port number to listen for requests
  }
}

config.entry['app'] = ['./src/browserui/views/browser/index.tsx'];
config.entry['find'] = ['./src/browserui/views/find/index.tsx'];

config.plugins.push(new HtmlWebpackPlugin({template: './static/index.html',
  filename: 'app.html',
  chunks: [`vendor.app`, 'app']
}));

config.plugins.push(new HtmlWebpackPlugin({template: './static/index.html',
  filename: 'find.html',
  chunks: [`vendor.app`, 'find']
}));

module.exports = config;