'use strict'

const Event = use('App/Models/Event')

class EventController {
  async getAll ({response,auth}) {
    if(auth.user.id_role == 3 || auth.user.id_role == 4){
    const events = await Event.query().fetch()
      if(events.rows.length != 0) return response.status(200).send(events)
      else return response.status(404).send("Nessun evento Trovato")
  }else{
    const events = await Event.query().where('private', 0).fetch()
    if(events.rows.length != 0) return response.status(200).send(events)
    else return response.status(404).send("Nessun evento Trovato")
  }
}

  async getById ({params, response, auth}) {
    const id_params = params.id
    const event = await Event.query()
      .where('id' , id_params)
      .with('partecipants')
      .with('category')
      .with('location')
      .with('creator')
      .fetch()
      if(event.rows.length != 0) return response.status(200).send(event)
      else return response.status(404).send("Evento non trovato")
  }

  async create ({request, response }) {
    try {
      const data = request.all()
      var event = await Event.create(data)
      await event.save()
      return  response.status(200).send({id: event.id})
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }
  async update({params, request, response}){
    try {
      const data = request.only(['title','id_category','id_location','date_from','date_to','hour_from','hour_to','note'])
      const { id } = params
      const  event = await Event.find(id)
      if(event){
        event.merge({...data})
        await event.save()
        return response.send('Evento Modificato')
      } else return response.status(404).send('Evento non trovato')
    } catch (error) {
      return response.status(500).send({message: error.message})
    }
  }

  async deleteById ({params,response}) {
    try {
      const { id } = params
      const event = await Event.find(id)
      if(event) {
        await event.partecipants().delete()
        await event.delete()
        return  response.status(200).send("Evento cancellato correttamente")
      } return response.status(404).send("Non esiste questo evento")   
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

}

module.exports = EventController
