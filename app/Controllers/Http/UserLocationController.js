'use strict'

const UserLocation = use('App/Models/UserLocation')

class UserLocationController {
  async addPrivate ({request,response, params}) {
    try {
      const { id } = params
      const { id_users } = request.all()
      let messages = []
      for(let i in id_users) {
        const query = await UserLocation.query().where('id_location', id).where('id_user', id_users[i]).fetch()
        
        if(query.rows.length!=0) messages.push({message: 'L\'associazione Utente '+id_users[i]+' con Location '+id+' già esiste'})
        else {
          await UserLocation.create({'id_location': id, 'id_user': id_users[i]})
          messages.push({message:'Associazione Utente '+id_users[i]+' con Location '+id+' creata'})
        }
      }
      return response.status(200).send(messages)
    } catch(e) {
      return response.status(500).send({
        message: e.message
      })
    }
  }

  async removePrivate({request, response, params}){
    try {
      const { id } = params
      const { id_users } = request.all()
      let messages = []
      for(let i in id_users) {
        const query = await UserLocation.query().where('id_location', id).where('id_user', id_users[i]).fetch()
        
        if(query.rows.length==0) messages.push({message: 'L\'associazione Utente '+id_users[i]+' con Location '+id+' non esiste'})
        else {
          const userLocation = await UserLocation.find(query.rows[0].id)
          await userLocation.delete()
          messages.push({message:'Associazione Utente '+id_users[i]+' con Location '+id+' rimossa'})
        }
      }
      return response.status(200).send(messages)
    } catch (error) {
      return response
        .status(500)
        .send({message: error.message})
    }
  }
}

module.exports = UserLocationController
