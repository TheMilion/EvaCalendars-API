'use strict'

class userRouteAdminPrivate {

  async handle ({ params,response, auth }, next) {
    if (auth.user.id_role == 2 || auth.user.id_role == 3 || auth.user.id_role == 4 ) await next()
    else{
      return response.status(401).send("Non hai i permessi per accedere a questa rotta") 
    }
  }


}

module.exports = userRouteAdminPrivate
