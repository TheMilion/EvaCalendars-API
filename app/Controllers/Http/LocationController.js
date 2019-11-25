'use strict'

const Location = use('App/Models/Location')
const Event = use('App/Models/Event')
class LocationController {

  async getAll () {
    const location = await Location
      .query()
      //.with('partecipants')
      //.with('category')
      //.with('location')
      //.with('creator')
      .fetch()
     return location
  }

  async getId ({request, response, params}) {
    try {
      const { id } = params
      const location = await Location
      .query()
      .where('id', id)
      .with('partecipants')
      //.with('category')
      //.with('location')
      //.with('creator')
      .fetch()
      if(location) return response.status(200).send(location)
      else return response.status(400).send('Location non trovata')
    } catch (error) {
      return response.status(500).send({
        message: error.message
      })
    }
  }
  
  async create ({request, response}) {
    try {
      const location = request.all()
      await Location.create(location)
      return response.status(200).send('Location creata correttamente')
    } catch (error) {
      return response.status(500).send({
        message: error.message
      })
    }
  }

  async update ({request, response, params}) {
    try {
      const data = request.all()
      const { id } = params
      const location = await Location.find(id)
      location.merge({...data})
      await location.save()
      return response.send('Location modificata correttamente')
    } catch (error) {
      return response.status(500).send({
        message: error.message
      })
      
    }
  }

  async delete ({response, params}) {
    try {
      const { id } = params
      const location = await Location.find(id)
      await Event.query().where('id_location', params.id).update({ id_location: 0})
      await location.partecipants().delete()
      await location.delete()
      return response.status(200).send('Location eliminata correttamente')
    } catch (error) {
      return response.status(500).send({
        message: error.message
      })
    }
  }

  async getEvents({params, response}){
    // const location = await Location.find(params.id)
    const location2 = await Location
    .events()
    // .fetch()
      // .query()
      // .where('id', params.id)
      // .with('events')
      // .with('category')
      // .with('location')
      // .with('creator')
      .fetch()
     return location2
  }
}

module.exports = LocationController
