'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserLocation extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
      }
      member () {
        return this.hasOne('App/Models/User', 'id_user','id')
      }
}

module.exports = UserLocation
