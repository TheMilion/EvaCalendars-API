'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
      descrizione: 'required'
    }
  }

  get messages () {
    return {
      'nome.required': 'Campo Nome Obbligatorio',
      'descrizione.required': 'Campo Descrizione Obbligatorio',
    }
}

}
module.exports = User
