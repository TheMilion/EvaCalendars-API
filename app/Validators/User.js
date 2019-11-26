'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
      cognome: 'required',
      email: 'required|email|unique:users',
      password: 'required',
      reparto: 'required',
      id_role: 'required'

    }
  }

  get messages () {
    return {
      'email.required': 'Campo Email Obbligatorio',
      'email.email': 'Inserisci un email corretta',
      'email.unique': 'Inidirizzo email gia utilizzato.',
      'nome.required': 'Campo Nome Obbligatorio',
      'cognome.required': 'Campo Cognome Obbligatorio',
      'reparto.required': 'Campo Reparto Obbligatorio',
      'id_role.required': 'Campo Ruolo Obbligatorio',
    }
}

}
module.exports = User
