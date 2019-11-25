'use strict'

class userRouteDualPrivate {

  async handle ({ params,response, auth }, next) {
    if (auth.user.id_role == 3 || auth.user.id_role == 4 ) await next()
    else{
      if (auth.user.id !== Number(params.id)) return response.status(401).send("Non hai i permessi per accedere a questa rotta") 
      else await next()
    }
  }


}

module.exports = userRouteDualPrivate
