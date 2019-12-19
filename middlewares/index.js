module.exports.checkToken = (req, res, next) => {
  const secret = process.env.SECRET || require('config').get('slack.secret')

  console.log(secret, "My Secret")
  if (req.get('X-Gitlab-Token') === secret) {
    console.log('I am here')
    return next()
  }
  return next('Easy there champs!! Nice try! :p')
}

module.exports.GroupMessageConstructor = (formattedMessage) => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `https://hooks.slack.com/services/${process.env.TOKEN || require('config').get('slack.token')}`,
  data: formattedMessage
})

module.exports.DirectMessageConstructor = (formattedMessage) => ({
  method: 'post',
  url: 'https://slack.com/api/chat.postMessage',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  data: {
      ...formattedMessage,
    channel: payload ? payload.user : 'URDAKB6NN',
  }
})