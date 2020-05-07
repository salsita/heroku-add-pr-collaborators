const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const pipelineId = process.env.PIPELINE
const parentAppId = process.env.PARRENT
const prNumber = process.env.GITHUB_PR_ID
const copyCollaborators = async () => {
  const apps: ReviewApp[] = await heroku.get(`/pipelines/${pipelineId}/review-apps`)
  const prApp = apps.find(reviewApp => reviewApp.pr_number === prNumber)
  if (!prApp) {
    throw new Error(`review app for PR #${prNumber} not found`)
  }
  const prCollaborators: Collaborator[] = await heroku.get(`/apps/${prApp.app.id}/collaborators`)
  const parentCollaborators: Collaborator[] = await heroku.get(`/apps/${parentAppId}/collaborators`)
  const prCollaboratorEmails = new Set(prCollaborators.map(({ user: { email } }) => email))
  const emailsToAssign = parentCollaborators
    .map(({ user: { email } }) => email)
    .filter(email => !prCollaboratorEmails.has(email))
  for (const email of emailsToAssign) {
    try {
      await heroku.post(`/apps/${prApp.app.id}/collaborators`, { body: { user: email, silent: true } })
      console.log(`User ${email} assigned.`)
    } catch (e) {
      console.error(email, e.body ? e.body.message : e.message)
      process.exit(1)
    }
  }
}
copyCollaborators()
  .catch(e => {
    console.warn(email, e.body ? e.body.message : e.message)
  })
