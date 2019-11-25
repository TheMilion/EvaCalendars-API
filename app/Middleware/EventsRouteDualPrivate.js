'use strict'

const EventPartecipant = use('App/Models/EventPartecipant')

class userCategoriesRouteDualPrivate {

  async handle ({ params,response, auth }, next) {
    const id_params = params.id
    if(!([3,4].includes(auth.user.id_role))){
      let check = await EventPartecipant.query().where('id_event',id_params).where('id_user', auth.user.id).fetch()
      if(check.rows.length === 0) {
        return response.status(401).send("Non hai i permessi per visualizzare questa categoria")
      }
    }
    await next()
    
  }
}

module.exports = userCategoriesRouteDualPrivate
