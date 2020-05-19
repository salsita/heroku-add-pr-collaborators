# heroku-add-pr-collaborators

Automatically copy collaborators from parent app to new PR app.

Example of workflow configuration attached, the file should go to `.github/workflows/heroku-add-pr-collaborators.yml`

## Prerequisites

These environment variables must be set in GitHub Secretes:
* HEROKU_API_TOKEN
* PIPELINES (*comma separated*, usually in form of uuids, to be found in Heroku's pipelines' URLs)
* PARENT (name of the app from which the collaborators will be copied)
