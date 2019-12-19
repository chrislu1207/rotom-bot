module.exports.checkToken = (req, res, next) => {
  const secret = process.env.SECRET || require('config').get('slack.secret')

  console.log(secret, "My Secret")
  if(req.get('X-Gitlab-Token') === secret) {
    console.log('I am here')
    return next()
  }
  return next('Easy there champs!! Nice try! :p')
}

module.exports.axiosConstructor = (formattedMessage) => {
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `https://hooks.slack.com/services/${process.env.TOKEN || require('config').get('slack.token')}`,
    data: formattedMessage
  }
}