module.exports = handlePullRequestChange

async function handlePullRequestChange (robot, context) {
  const title = context.payload.pull_request.title
  const isWip = /\b(wip|do not merge)\b/i.test(title)
  const status = isWip ? 'pending' : 'success'

  console.log(`Updating PR "${title}" (${context.payload.pull_request.html_url}): ${status}`)

  context.github.repos.createStatus(context.repo({
    sha: context.payload.pull_request.head.sha,
    state: status,
    target_url: 'https://github.com/apps/wip',
    description: isWip ? 'work in progress – do not merge!' : 'ready for review',
    context: 'WIP'
  }))
}
