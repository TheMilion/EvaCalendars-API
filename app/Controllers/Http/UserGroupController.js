'use strict'

const UserGroup = use('App/Models/UserGroup')
const Group = use('App/Models/Group')
var counterError = 0

class UserGroupController {

  async addById ({request,response, params}) {
    try {
      const id_params = params.id
      const {utenti} = request.all()
      var gruppoExist = await Group.find(id_params)
        if(gruppoExist){
          var gruppo = await UserGroup.query()
          .where('id_group' , id_params).fetch()
          gruppo = gruppo.toJSON()
          utenti.forEach(user => {
            counterError = 0
            gruppo.forEach(group => { if(user.id_user == group.id_user) counterError ++ })
              if(counterError == 0 ) UserGroup.create({...user, id_group: id_params}) });
            return response.status(200).send("Operazione Effettuata Correttamente")
        }else return response.status(404).send("il Gruppo non esiste")    
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async modifyManagerById ({request,response, params}) {
    try {
      const id_params = params.id
      const {utenti} = request.all()
      var gruppoExist = await Group.find(id_params)
        if(gruppoExist){
          utenti.forEach(async user => {
            await UserGroup.query()
              .where('id_group' , id_params)
              .where('id_user' , user.id_user)
              .update({manager: user.manager})
          })
        return response.status(200).send("Operazione Effettuata Correttamente")
      }else return response.status(404).send("il Gruppo non esiste")    
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async deleteUserById ({request,response, params}) {
    try {
      const id_params = params.id
      const {utenti} = request.all()
      var gruppoExist = await Group.find(id_params)
        if(gruppoExist){
          const users = utenti.map(x => x.id_user);
          var gruppo = await UserGroup.query()
            .where('id_group' , id_params)
            .whereIn('id_user', users)
            .delete()
        return response.status(200).send("Utenti Rimossi correttametente")
      }else return response.status(404).send("il Gruppo non esiste")    
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

}

module.exports = UserGroupController
