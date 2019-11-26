'use strict'
const Group = use('App/Models/Group')
const UserGroup = use('App/Models/UserGroup')

class GroupController {
  async getAll ({response}) {
    try {
      const group = await Group.all()
      if(group.rows.length == 0) return response.status(404).send("il Gruppo non esiste")    
      else return response.status(200).send(group)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async create ({request, response }) {
    const {nome} = request.only(['nome'])
      await Group.create({nome: nome})
      return response.send("Gruppo Creato Correttamente")
     }

    async getById ({response, params}) {
    try {
      const id_params = params.id
      const group = await Group
        .query()
        .where('id',id_params)
        .with('partecipants')
        .fetch()
      if(group.rows.length == 0) return response.status(404).send("il Gruppo non esiste")    
      else return response.status(200).send(group)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async deleteById ({params,response}) {
    try {
      const id_params = params.id
      var gruppoExist = await Group.find(id_params)
        if(gruppoExist){
          await gruppoExist.partecipants().delete()
          await gruppoExist.delete()
          return response.status(200).send("Gruppo Eliminato")
        }else return response.status(404).send("il Gruppo non esiste")    
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async update ({ params, request, response }) {
    const {nome} = request.only(['nome'])
    const { id } = params      
    const gruppo =  await Group.find(id)
      if(gruppo){
        gruppo.merge({nome: nome})
        await gruppo.save()
      }else return response.status(404).send("il Gruppo non esiste")  
    return response.send("Gruppo modificato correttamente") 
  }

}

module.exports = GroupController
