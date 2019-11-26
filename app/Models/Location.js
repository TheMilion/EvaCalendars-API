'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Location extends Model {

    static get hidden() {
        return ['created_at', 'updated_at']
      }
    events () {
      return this.hasMany('App/Models/Event', 'id','id_location')
    }
    partecipants () {
      return this.hasMany('App/Models/UserLocation', 'id','id_location').with('member')
      }
}

module.exports = Location
