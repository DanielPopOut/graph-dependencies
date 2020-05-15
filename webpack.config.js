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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
