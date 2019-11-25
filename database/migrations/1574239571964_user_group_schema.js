'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGroupSchema extends Schema {
  up () {
    this.create('user_groups', (table) => {
      table.increments()
      table.integer("id_user").notNullable()
      table.integer("id_group").notNullable()
      table.boolean("manager").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_groups')
  }
}

module.exports = UserGroupSchema
