'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserLocationsSchema extends Schema {
  up () {
    this.create('user_locations', (table) => {
      table.increments()
      table.integer("id_location").notNullable()
      table.integer("id_user").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_locations')
  }
}

module.exports = UserLocationsSchema
