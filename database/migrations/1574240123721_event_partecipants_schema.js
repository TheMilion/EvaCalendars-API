'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventPartecipantsSchema extends Schema {
  up () {
    this.create('event_partecipants', (table) => {
      table.increments()
      table.integer("id_event").notNullable()
      table.integer("id_user")
      table.string("nome")
      table.string("cognome")
      table.string("email")
      table.string("stato").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('event_partecipants')
  }
}

module.exports = EventPartecipantsSchema
