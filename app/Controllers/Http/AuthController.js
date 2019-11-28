'use strict'

const Category = use('App/Models/Category')
const Event = use('App/Models/Event')
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

    async logout({ request, response, auth }){
      try {
        const refreshToken = request.input('refreshToken');
        if(!refreshToken){
            // You can throw any exception you want here
            throw response.send(`Refresh Token missing`);
        }

        await auth
          .authenticator('jwt')
          .revokeTokens([refreshToken], true)

        console.log(auth.user)

        return response.send({status : 200, "message" : 'success'})
      } catch (error) {
        return response.status(500).send(error)
      }
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
          const creatorEvent =  await Event.query().where("id_creator", auth.user.id).fetch()
          const events = await auth.user.events().fetch()
          return response.status(200).send({creator: creatorEvent, partecipate: events})
        } catch(e) {
          return response.status(500).send({
            message: e.message
          })
        }
      } 

      async getlocation({ response, auth }) {
        try {
          const location = await auth.user.location().fetch()
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
        return response.status(200).send(groups)
      } catch(e) {
        return response.status(500).send({
          message: e.message
        })
      }    
    } 
}

module.exports = AuthController
