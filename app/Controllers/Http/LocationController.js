'use strict'

const Location = use('App/Models/Location')
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
}

module.exports = LocationController
