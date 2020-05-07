#!/bin/bash

npm install heroku-client

curl -sSL https://raw.githubusercontent.com/salsita/heroku-add-pr-collaborators/init/main.js \
  > main.js

# secrets set in GitHub Secrets
export HEROKU_API_TOKEN="${{ secrets.HEROKU_API_TOKEN }}"
export PIPELINE="${{ secrets.PIPELINE }}"
export PARENT="${{ secrets.PARENT }}"
export GITHUB_PR_ID="${{ github.event.number }}"

node main.js
