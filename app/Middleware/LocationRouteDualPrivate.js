'use strict'
const UserLocation = use('App/Models/UserLocation')

class PrivateLocations {

    async handle ({ params,response, auth }, next) {
        if (auth.user.id_role == 3 || auth.user.id_role == 4 ) await next()
        else{
            const { id } = params
            const location = await UserLocation.findBy('id_location', id)
            if(!location) return response.status(404).send({message: 'UserLocation not found'})
            let check = await UserLocation.query().where('id_user', auth.user.id)
            if(check.rows.length === 0) {
                return response
                    .status(401)
                    .send("Non hai i permessi per accedere a questa rotta") 
            }else 
                await next()
        }
    }


}

module.exports = PrivateLocations