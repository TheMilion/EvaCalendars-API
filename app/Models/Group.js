'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
      }

    partecipants () {
    //modello finale -- chiave esterna sulla pivot modello id 
    //return this.belongsToMany('App/Models/User', "id_event", "id_user", "id", "id").select(['nome','cognome','email']).pivotModel('App/Models/EventPartecipant').withPivot(['stato'])
    return this.hasMany('App/Models/UserGroup', 'id','id_group').with('member')
    }
}

module.exports = Group
