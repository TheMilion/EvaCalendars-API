'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {

    static get dates() {
        return super.dates.concat['date_from','date_to']
    }  

    static get hidden() {
        return ['created_at', 'updated_at']
      }

    partecipants () {
        //modello finale -- chiave esterna sulla pivot modello id 
        //return this.belongsToMany('App/Models/User', "id_event", "id_user", "id", "id").select(['nome','cognome','email']).pivotModel('App/Models/EventPartecipant').withPivot(['stato'])
        return this.hasMany('App/Models/EventPartecipant', 'id','id_event').with('partecipant')
    }
    category () {
        return this.hasOne('App/Models/Category', 'id_category','id')
    }
    location () {
        return this.hasOne('App/Models/Location', 'id_location','id')
    }
    
    creator() {
        return this.hasOne('App/Models/User','id_creator', 'id')
    }
    
}   

module.exports = Event
