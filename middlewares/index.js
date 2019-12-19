module.exports.checkToken = (req, res, next) => {
  const secret = process.env.SECRET || require('config').get('slack.secret')

  if (req.get('X-Gitlab-Token') === secret) {
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

module.exports.DirectMessageConstructor = (formattedMessage, id) => {
  const token = process.env.BOT_TOKEN || require('config').get('bot.token')
  console.log(`${process.env[`USER_${id}`]}`, "USER SLACK ID")
  return {
    method: 'post',
    url: 'https://slack.com/api/chat.postMessage',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: {
        ...formattedMessage,
      channel: `${process.env[`USER_${id}`]}`
    }
  }
  
}