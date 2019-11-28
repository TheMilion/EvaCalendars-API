'use strict'

const EventPartecipant = use('App/Models/EventPartecipant')
const Event = use('App/Models/Event')

class userCategoriesRouteDualPrivate {

  async handle ({ params,response, auth }, next) {
    
    const id_params = params.id
    let checkPrivate = await Event.query().where('id',id_params) .where('private', 0).fetch()
    if(checkPrivate.rows.length === 0) {
    if(!([3,4].includes(auth.user.id_role))){
      let checkCreator = await Event.query()
      .where('id',id_params) 
      .where('id_creator', auth.user.id).fetch()
      if(checkCreator.rows.length === 0){
        let check = await EventPartecipant.query().where('id_event',id_params).where('id_user', auth.user.id).fetch()
        if(check.rows.length === 0) {
          return response.status(401).send("Non hai i permessi per visualizzare questa categoria")
      }
    }
  }
  }
    await next()
    
  }
}

module.exports = userCategoriesRouteDualPrivate
