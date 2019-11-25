'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer("id_role").notNullable()
      table.string("email",254).notNullable().unique()
      table.string("password",50).notNullable()
      table.string("nome",50).notNullable()
      table.string("cognome",50).notNullable()
      table.string("reparto",100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
