#!/bin/bash

# clean
echo "Cleaning dist folder"
rm -rf dist/*

# copy
echo "Copying static files to dist folder"
mkdir -p dist
cp -R static/* dist/

cp dist/index.html dist/404.html
