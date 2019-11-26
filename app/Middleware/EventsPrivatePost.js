'use strict'

const EventPartecipant = use('App/Models/EventPartecipant')
const Event = use('App/Models/Event')

class userCategoriesRouteDualPrivate {

  async handle ({ params,response, auth }, next) {
    const id_params = params.id
    if(!([2,3,4].includes(auth.user.id_role)))return response.status(401).send("Non hai i permessi per visualizzare questa pagina")
    else await next()
    
  }
}

module.exports = userCategoriesRouteDualPrivate
