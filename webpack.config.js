'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var env = process.env.NODE_ENV || 'dev';
var debug = (process.env.DEBUG && true) || false;

var publicPath;
if (env === 'dev' || debug) {
  publicPath = 'http://localhost:4001/';
} else {
  publicPath = 'https://trucksu.com/';
}

// helpers for writing path names
// e.g. join("web/static") => "/full/disk/path/to/hello/web/static"
function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('src/' + dest); }

var babelSettings = {
  cacheDirectory: true,
  plugins: ['transform-decorators-legacy'],
  presets: ['react', 'es2015', 'stage-0'],
};

var config = module.exports = {
  // our application's entry points - for this example we'll use a single each for
  // css and js
  entry: {
    application: [
      web('css/application.scss'),
      web('js/application.js'),
    ],
  },

  devtool: 'source-map',

  // where webpack should output our files
  output: {
    path: join('dist'),
    filename: 'js/application.js',
    publicPath: publicPath,
  },

  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['node_modules'],
  },

  // more information on how our modules are structured, and
  //
  // in this case, we'll define our loaders for JavaScript and CSS.
  // we use regexes to tell Webpack what files require special treatment, and
  // what patterns to exclude.
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify(babelSettings)],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?-autoprefixer&-minimize',
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
      },
      {
        test: [/\.png$/, /\.gif$/, /\.jpg$/],
        loader: 'file-loader?name=images/[name].[ext]'
      },
    ],
  },

  // what plugins we'll be using
  // we'll also tell the plugin where the final CSS file should be generated
  // (relative to config.output.path)
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.DEBUG': JSON.stringify(debug),
      'process.env.API_PORT': JSON.stringify(process.env.API_PORT),
    }),
    new ExtractTextPlugin('css/application.css'),
  ],
};

// if running webpack in production mode, minify files with uglifyjs
if (env === 'production' && !debug) {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
} else {
  config.entry.application.unshift('webpack-hot-middleware/client');
  config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}

