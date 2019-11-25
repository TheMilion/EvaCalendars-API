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
            // I personally do not want to return the full user object here
            return user
        } catch (error) {
            response.status(401).send(error)
        }
    } 

    async getEvents({auth, request, response}) {
        try {
          const events = await auth.user.events().query().fetch()
          return response.status(200).send(events)
        } catch(e) {
          return response.status(500).send({
            message: e.message
          })
        }
      } 

      async getlocation({ response, auth }) {
        try {
          const location = await auth.user.location().fetch()
          console.log(location)
          return response.status(200).send(location)
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
        console.log(groups)
        return response.status(200).send(groups)
      } catch(e) {
        return response.status(500).send({
          message: e.message
        })
      }    
    } 
}

module.exports = AuthController
