const config = require('config')

module.exports.checkToken = (req, res, next) => {
  const secret = config.get('slack.secret') || process.env.SECRET

  console.log(secret, "My Secret")
  if(req.get('X-Gitlab-Token') === secret) {
    console.log('I am here')
    return next()
  }
  return next('Easy there champs!! Nice try! :p')
}