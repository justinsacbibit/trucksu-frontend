#!/bin/bash

./build-common.sh

# bundle
echo "Bundling"
./node_modules/webpack/bin/webpack.js

