'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'min:1',
      cognome: 'min:1',
      email: 'email|unique:users',
      password: 'min:6',
      reparto: 'min:1',
      id_role: 'min:1'

    }
  }

  get messages () {
    return {
      'email.min': 'Campo Email Obbligatorio',
      'email.email': 'Inserisci un email corretta',
      'email.unique': 'Inidirizzo email gia utilizzato.',
      'nome.min': 'Campo Nome Obbligatorio',
      'cognome.min': 'Campo Cognome Obbligatorio',
      'reparto.min': 'Campo Reparto Obbligatorio',
      'id_role.min': 'Campo Ruolo Obbligatorio',
    }
}

}
module.exports = User
