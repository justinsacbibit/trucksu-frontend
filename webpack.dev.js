#!/usr/bin/env node

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var compiler = webpack(config);
var app = express();
app.use(require('cors')());

app.use(require('webpack-dev-middleware')(compiler, {
  //noInfo: true,
  publicPath: config.output.publicPath,
  log: console.log,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('static'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
})

app.listen(4001, '0.0.0.0', function(err) {
  if (err) return console.error(err);
  console.log('dev server running on localhost:4001');
});

process.stdin.resume();
process.stdin.on('end', function() {
  process.exit(0);
});
