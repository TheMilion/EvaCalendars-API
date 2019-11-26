'use strict'

const Category = use('App/Models/Category')
const Event = use('App/Models/Event')

class CategoryController {
   
  async getAll ({response}) {
    try {
      const usercat = await Category.all()
      if(usercat) return response.status(200).send(usercat)
      else return response.status(404).send("Nessuna categoria presente nel db")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }
  
  async getById ({response, params}) {
    try {
       const getUser = await Category.query().where('id', params.id).with('user').fetch()
      if(getUser) {
      return response.status(200).send(getUser)
    }else response.status(404).send("Categoria non trovata")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async deleteById({params, response}) {
  try {
    const categories = await Category.find(params.id)
    if(categories) {
      await Event.query().where('id_category', params.id).update({ id_category: 0})
      await categories.delete()
      return  response.status(200).send("Categoria Cancellata Correttamente")
    }else response.status(404).send("Categoria non trovata")
  } catch(e) {
    return response.status(500).send({
      message: e.message
    })
  }
}

async updateById ({ params, request, response }) {
  try {
    const nome = request.only(['nome'])
    const categories = await Category.find(params.id)
    if(categories) {
      categories.merge({...nome})
      await categories.save()
      return  response.status(200).send("Categoria Modificata Correttamente")
    }else response.status(404).send("Categoria non trovata")
  } catch(e) {
    return response.status(500).send({
      message: e.message
    })
  }
}

async create ({request, response, auth}) {
  try {
    const nome = request.only(['nome'])
    await Category.create({...nome, "id_user" : auth.user.id})
    return  response.status(200).send("Categoria Creato Correttamente")
  } catch(e) {
    return response.status(500).send({
      message: e.message
    })
  }
}

  async getEvents({params}){
    const category = await Category.find(params.id)
    return category.event().fetch()
    // const category2 = await Category
    // .query()
    // .where('id', params.id)
    // // .with('user')
    // .with('event')
    // .fetch()
    // return category2
  }
}

module.exports = CategoryController
