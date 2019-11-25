'use strict'

const Event = use('App/Models/Event')

class EventController {
  async getAll () {
    const event = await Event
      .query()
      //.with('partecipants')
      //.with('category')
      //.with('location')
      //.with('creator')
      .fetch()
     return event
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
      console.log(event)
      if(event) return event
      else return response.status(404).send("Evento non trovato")
  }
}

module.exports = EventController
