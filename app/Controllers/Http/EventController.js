'use strict'

const Event = use('App/Models/Event')

class EventController {
  async getAll ({response}) {
    const events = await Event.query().fetch()
      if(events.rows.length != 0) return response.status(200).send(events)
      else return response.status(404).send("Nessun evento Trovato")
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
      await Event.create(data)
      return  response.status(200).send("Evento Creato Correttamente")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }
  async update({params, request, response}){
    try {
      const data = request.all()
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
