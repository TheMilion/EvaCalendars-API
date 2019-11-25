'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.integer("id_category")
      table.integer("id_location")
      table.integer("id_owner").notNullable()
      table.integer("id_creator").notNullable()
      table.date("date_from").notNullable()
      table.date("date_to").notNullable()
      table.time("hour_from").notNullable()
      table.time("hour_to").notNullable()
      table.string("note")
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
