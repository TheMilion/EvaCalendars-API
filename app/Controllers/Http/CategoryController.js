'use strict'

const Category = use('App/Models/Category')

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
      const categories = await Category.find(params.id)
        if(categories) {
          return response.status(200).send(categories)
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
}

module.exports = CategoryController
