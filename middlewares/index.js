module.exports.checkToken = (req, res, next) => {
    // Check for Sec Token on Header (Middleware) - TIM
  //Extrat te event type
  // Call a switch (fn) based on the event type (it will send requrest to slack)
  // return 200
  console.log(req.get('X-Gitlab-Token'), 'Secret Token')
  const secret = config.get('slack.secret') || process.env.SECRET

  if(req.get('X-Gitlab-Token') === secret) {
    next()
  }
  res.send('Easy there champs!! Nice try! :p')
}