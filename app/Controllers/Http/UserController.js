'use strict'

const User = use('App/Models/User')


class UserController {

  async getAll ({response}) {
    try {
      const users = await User.all()
      if(users) return response.status(200).send(users)
      else return response.status(404).send("Nessun utente presente nel db")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }


  async getById ({params, response, auth}) {
    try {
      const id_params = params.id
      const users = await User.find(id_params)
      if(users) return response.status(200).send(users)
      else return response.status(404).send("Utente Non Trovato")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async getLocationById({params, response}) {
    try {
      const id_params = params.id
      const users = await User.find(id_params)
      const location = await users.location().fetch()
      return  response.status(200).send(location)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async getCategoriesById({params, response}) {
    try {
      const id_params = params.id
      const users = await User.find(id_params)
      const category = await users.category().fetch()
      return  response.status(200).send(category)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }
  
  async getEventsById({params, response}) {
    try {
      const id_params = params.id
      const users = await User.find(id_params)
      const events = await users.events().fetch()
      return  response.status(200).send(events)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async getGroupsById({params, response}) {
    try {
      const id_params = params.id
      const users = await User.find(id_params)
      const groups = await users.groups().fetch()
      return  response.status(200).send(groups)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async create ({request, response }) {
    try {
      const data = request.all()
      await User.create(data)
      return  response.status(200).send("Utente Creato Correttamente")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async deleteById ({params,response}) {
    try {
      const { id } = params
      const user = await User.find(id)
      await user.delete()
      return  response.status(200).send("Utente cancellato correttamente")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async update ({ params, request, response }) {
    const data = request.all()
    const { id } = params
    const user =  await User.find(id)
      user.merge({...data})
      await user.save()
      return response.send("Utente modificato correttamente") 
  }

}

module.exports = UserController
