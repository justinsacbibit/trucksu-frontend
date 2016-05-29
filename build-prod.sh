#!/bin/bash

./build-common.sh

# bundle
echo "Bundling"
NODE_ENV=production ./node_modules/webpack/bin/webpack.js -p

