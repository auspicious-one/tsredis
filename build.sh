#!/bin/sh
rm -rf ./lib

tsc -d -p tsconfig.json

cp ./package.publish.json ./lib/package.json

cp ./README.publish.md ./lib/README.md