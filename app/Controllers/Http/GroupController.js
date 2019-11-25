'use strict'
const Group = use('App/Models/Group')

class GroupController {
  async getAll ({response}) {
    try {
      const group = await Group.all()
      return response.status(200).send(group)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async create ({request, response }) {
    const groupData = request._original
      await Group.create({...groupData})
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
      return response.status(200).send(group)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

}

module.exports = GroupController
