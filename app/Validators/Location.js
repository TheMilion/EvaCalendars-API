'use strict'

class Location {
    get validateAll () {
        return true
    }

    get rules () {
        return {
            nome: 'required',
            indirizzo: 'required',
            contatti: 'required'
        }
    }

    get messages () {
        return {
            'nome.required': 'Campo Nome Obbligatorio',
            'indirizzo.required': 'Campo Indirizzo Obbligatorio',
            'contatti.required': 'Campo Contatti Obbligatorio'
        }
    }
}
module.exports = Location