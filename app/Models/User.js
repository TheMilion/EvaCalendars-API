'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Category = ('App/Models/Category')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()


    


    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */

  static get hidden() {
    return ['password','created_at', 'updated_at']
  }

  
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  role() {
    return this.belongsTo('App/Models/Role','id_role', 'id')
  }

  category() {
    return this.hasMany('App/Models/Category','id', 'id_user')
  }

  location() {
    return this.belongsToMany('App/Models/Location','id_user', 'id_location', "id", "id")
    .pivotTable('user_locations')
  }

  groups() {
    return this.belongsToMany('App/Models/Group','id_user', 'id_group', "id", "id")
    .pivotTable('user_groups')
  }

  events () {
    return this.belongsToMany('App/Models/Event', "id_user", "id_event", "id", "id")
      .with('location')
      .with('partecipants')
      .with('category')
      .with('creator')
      .pivotTable('event_partecipants')
}
}

module.exports = User
