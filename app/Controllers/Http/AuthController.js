'use strict'

const Category = use('App/Models/Category')

class AuthController {

    async login ({ request, auth }) {
        const { email, password } = request.all()
        const Token = await auth
        .withRefreshToken()
        .attempt(email, password)
        return Token
      }

    async refresh({request, auth}) {
        const refreshToken = request.input('refresh_token')
        return await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken);
    }
    
    async getUser({ response, auth }) {
        try {
            const user = await auth.getUser()
            return user
        } catch (error) {
            response.status(401).send(error)
        }
    } 

    async getEvents({auth, request, response}) {
        try {
          const events = await auth.user.events().fetch()
          if(events.rows.length != 0) return response.status(200).send(events)
          else return response.status(404).send("Nessun evento Trovato")
        } catch(e) {
          return response.status(500).send({
            message: e.message
          })
        }
      } 

      async getlocation({ response, auth }) {
        try {
          const location = await auth.user.location().fetch()
          if(location.rows.length != 0) return response.status(200).send(location)
          else return response.status(404).send("Nessuna Location Trovato")
        } catch(e) {
          return response.status(500).send({
            message: e.message
          })
        }
      }
    
      async getCategory({ response, auth }) {
        try {
          const globalCategory =  await Category.query().where("id_user", null).fetch()
          const category = await auth.user.category().fetch()
          return response.status(200).send({personali: category, globali:globalCategory})
        } catch(e) {
          return response.status(500).send({
            message: e.message
          })
        }    
    } 
    
    async getGroups({ response, auth }) {
      try {
        const groups = await auth.user.groups().fetch()
        if(groups.rows.length != 0) return response.status(200).send(groups)
        else return response.status(404).send("Nessuna gruppo trovato")
      } catch(e) {
        return response.status(500).send({
          message: e.message
        })
      }    
    } 
}

module.exports = AuthController
