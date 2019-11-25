'use strict'

const Role = use('App/Models/Role')

class RoleController {
  async getAll ({response}) {
    try {
      const role = await Role.all()
      return response.status(200).send(role)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async create ({request, response }) {
    try {
      const roleData = request.only(['nome','descrizione'])
      await Role.create({...roleData})
      return response.status(200).send("Ruolo Creato Correttamente")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
    }

  async deleteById ({params,response}) {
    try {
      const { id } = params
      const role = await Role.find(id)
      if(role) {
        await role.delete()
        return response.status(200).send("Ruolo cancellato correttamente")
      } else return response.send("Ruolo non esistente")  
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  } 

  async getById ({params, response, auth}) {
    try {
      const id_params = params.id
      const role = await Role.find(id_params)
      if(role) return response.status(200).send(role)
      else return response.status(404).send("Utente Non Trovato")
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

}

module.exports = RoleController
