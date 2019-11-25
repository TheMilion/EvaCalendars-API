'use strict'

const UserGroup = use('App/Models/UserGroup')

class UserGroupController {

  async addById ({request,response, params}) {
    try {
      const id_params = params.id
      const data = request.all()
      await UserGroup.create({id_user: data.id_user, manager: data.manager, id_group: params.id} )
      return response.status(200).send(data)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }
}

module.exports = UserGroupController
