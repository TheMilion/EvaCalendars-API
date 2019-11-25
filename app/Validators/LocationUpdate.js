'use strict'

class Location {
    get validateAll () {
        return true
    }

    get rules () {
        return {
            nome: 'min:1',
            indirizzo: 'min:1',
            contatti: 'min:1'
        }
    }

    get messages () {
        return {
            'nome.min': 'Campo Nome Obbligatorio',
            'indirizzo.min': 'Campo Indirizzo Obbligatorio',
            'contatti.min': 'Campo Contatti Obbligatorio'
        }
    }
}

module.exports = Location