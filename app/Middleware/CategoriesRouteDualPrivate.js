'use strict'

const Category = use('App/Models/Category')

class CategoriesRouteDualPrivate {

  async handle ({ params,response, auth }, next) {
    const id_params = params.id
    const categories = await Category.find(id_params)
    if(categories) {
      if (auth.user.id_role == 3 || auth.user.id_role == 4 ) await next()
      else{
        if(categories.id_user == auth.user.id) await next()
        else return response.status(401).send("Non hai i permessi per visualizzare questa categoria") 
      }
    }
    else return response.status(404).send("Non Esiste questa categoria") 
  }
}

module.exports = CategoriesRouteDualPrivate
