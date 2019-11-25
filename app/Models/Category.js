'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
    }

    user(){
      return this.hasOne('App/Models/User', 'id_user','id')
    }
    event(){
      return this.hasMany('App/Models/Event', 'id', 'id_category')
    }
}

module.exports = Category
