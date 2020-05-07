#!/bin/bash

npm install heroku-client

curl -sSL https://raw.githubusercontent.com/salsita/heroku-add-pr-collaborators/init/main.js \
  > main.js

for pipeline in $PIPELINES ; do
  PIPELINE=$pipeline node main.js
done
