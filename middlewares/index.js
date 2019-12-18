const config = require('config')

module.exports.checkToken = (req, res, next) => {
    // Check for Sec Token on Header (Middleware) - TIM
  //Extrat te event type
  // Call a switch (fn) based on the event type (it will send requrest to slack)
  // return 200
  const secret = config.get('slack.secret') || process.env.SECRET

  console.log(secret, "My Secret")
  if(req.get('X-Gitlab-Token') === secret) {
    console.log('I am here')
    return next()
  }
  return next('Easy there champs!! Nice try! :p')
}