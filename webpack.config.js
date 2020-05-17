const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = {
  mode: 'development',
  entry: {
    background: './src/background/background.js',
    graphdep: './src/contentScripts/index.ts',
    test: './src/testing/index.ts',
  },
  devtool: 'inline-source-map',
  plugins: [
    // new CleanWebpackPlugin(),
    new ExtensionReloader({
      manifest: path.resolve(__dirname, 'dist/manifest.json'),
    }),
    new CopyPlugin([{ from: 'public', to: '' }]),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: ['@babel/proposal-class-properties'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
