'use strict'

const UserGroup = use('App/Models/UserGroup')
const Group = use('App/Models/Group')
var counterError = 0

class UserGroupController {

  async addInGroups ({request,response}) {
    try {
      const {utenti} = request.all()
      utenti.forEach(async user => {
        counterError = 0
        var gruppo = await UserGroup.query().where('id_group' , user.id_group).fetch()
          gruppo = gruppo.toJSON()
          gruppo.forEach(group => { if(user.id_user == group.id_user) counterError ++ })
          if(counterError == 0 ) await UserGroup.create({id_user: user.id_user, id_group: user.id_group, manager: user.manager})
      }) 
    return response.status(200).send("Operazione Effettuata Correttamente")
      } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async deleteInGroups ({request,response}) {
    try {
      const {utenti} = request.all()
      utenti.forEach(async user => { await UserGroup.query().where('id_group' , user.id_group).where('id_user', user.id_user).delete() })
        return response.status(200).send("Operazione Effettuata Correttamente")
      } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }



  async addById ({request,response, params}) {
    try {

      const { id } = params
      const { id_users } = request.all()
      let messages = []
      for(let i in id_users) {
        const query = await UserGroup.query().where('id_group', id).where('id_user', id_users[i]).fetch()
  
        if(query.rows.length!=0) messages.push({message: 'L\'associazione Utente '+id_users[i]+' con il Gruppo '+id+' già esiste'})
        else {
          await UserGroup.create({'id_group': id, 'id_user': id_users[i]})
          messages.push({message:'Associazione Utente '+id_users[i]+' con Gruppo '+id+' creata'})
        }
      }
      return response.status(200).send(messages)
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
      const { id } = params
      const { id_users } = request.all()
      let messages = []
      for(let i in id_users) {
        const query = await UserGroup.query().where('id_group', id).where('id_user', id_users[i]).fetch()
        if(query.rows.length==0) messages.push({message: 'L\'associazione Utente '+id_users[i]+' con Gruppo '+id+' non esiste'})
        else {
          const userGruppo = await UserGroup.find(query.rows[0].id)
          await userGruppo.delete()
          messages.push({message:'Associazione Utente '+id_users[i]+' con Gruppo '+id+' rimossa'})
        }
      }
      return response.status(200).send(messages)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

}

module.exports = UserGroupController
