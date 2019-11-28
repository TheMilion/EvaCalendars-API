'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    //PATCH
    if(this.ctx.params.id) return {
      nome: 'required',
      cognome: 'required',
      email: 'required|email|unique:users',
      password: 'required',
      reparto: 'required',
      id_role: 'required'
    }
    //POST
    else return {
      nome: 'min:1',
      cognome: 'min:1',
      email: 'email|unique:users',
      password: 'min:4',
      reparto: 'min:1',
      id_role: 'min:1'
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
      'email.min': 'Campo Email Obbligatorio',
      'nome.min': 'Campo Nome Obbligatorio',
      'cognome.min': 'Campo Cognome Obbligatorio',
      'reparto.min': 'Campo Reparto Obbligatorio',
      'id_role.min': 'Campo Ruolo Obbligatorio',
    }
}

}
module.exports = User
