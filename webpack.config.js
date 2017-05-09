var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', 'postcss-loader', 'sass-loader'],
        publicPath: '/dist'
      })
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.pug$/,
      loader: ['html-loader', 'pug-html-loader']
    }, {
      test: /\.(png|jpg|ico|json|svg)$/,
      use: "file-loader?name=[path][name].[ext]?[hash]&publicPath=./&outputPath=./"
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: true
  },
  resolve: {
    alias: {
      'img': path.resolve(__dirname, './src/img')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: '"juksy.getsandbox.com"',
      APP_HOST: '"localhost:8080"'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './index.html',
      template: './src/pug/index.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './404.html',
      template: './src/pug/404.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './article_normal.html',
      template: './src/pug/article/normal.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './article_full.html',
      template: './src/pug/article/full.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './article_video.html',
      template: './src/pug/article/video.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './takeover_top.html',
      template: './src/pug/article/takeover_top.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './takeover_bottom.html',
      template: './src/pug/article/takeover_bottom.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './channel.html',
      template: './src/pug/channel.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './issue.html',
      template: './src/pug/issue.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './events.html',
      template: './src/pug/events.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './exclusive.html',
      template: './src/pug/exclusive.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './editors.html',
      template: './src/pug/editors.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './editor.html',
      template: './src/pug/editor.pug'
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    })
  ]
};
