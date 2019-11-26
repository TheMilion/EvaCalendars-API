'use strict'

const Event = use('App/Models/Event')
const EventPartecipant = use('App/Models/EventPartecipant')
var counterError = 0
class EventPartecipantController {

  async addById ({request,response, params}) {
    try {
      const id_params = params.id
      const {utenti} = request.all()
      var checkExist = await Event.find(params.id)
      var event = await EventPartecipant.query().where("id_event" , params.id).fetch()  
        if(checkExist){
          event = event.toJSON()
          utenti.forEach(user => {
            counterError = 0
            event.forEach(userEvent => { 
              if(user.id_user == 0 && user.email == userEvent.email) counterError ++
              else if(user.id_user != 0 && user.id_user == userEvent.id_user) counterError ++
            })
          if(counterError == 0 ) EventPartecipant.create({...user, id_event: id_params})
        })
        return response.status(200).send("Operazione Effettuata Correttamente")
       }else return response.status(404).send("Evento non esiste")    
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }


  async deleteUsersById ({request,response, params}) {
    try {
      const id_params = params.id
      const {utenti} = request.all()
      const users = utenti.map(x => x.id_user);
      var eventExist = await Event.find(id_params)
      if(eventExist){
        var event = await EventPartecipant.query()
          .where('id_event' , id_params)
          .whereIn('id_user', users)
          .delete()
        return response.status(200).send("Operazione Effettuata Correttamente")
      }else return response.status(404).send("Evento non esiste")    
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }


}

module.exports = EventPartecipantController
