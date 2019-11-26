'use strict'
const Validator = use('Validator')
const Database = use('Database')

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (value == 0) {
    return
  }
  if (!value) {
    return
  }

  const [table, column] = args
  const row = await Database.table(table).where(column, value).first()

  if (!row) {
    throw message
  }
}

Validator.extend('exists', existsFn)



class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      "utenti": 'required|array|min:1',
      "utenti.*.id_user": 'min:1|integer|exists:users,id',
      "utenti.*.stato": 'required|integer',
      "utenti.*.isOwner": 'required|integer',
      "utenti.*.nome": 'min:1',
      "utenti.*.cognome": 'min:1',
      "utenti.*.email": 'email',
    }
  }

  get messages () {
    return {
      'utenti.*.id_user.min': 'Campo id_user non puo essere vuoto se inserito',
      'utenti.*.id_user.exists' : 'id_user non esistente',
      'utenti.*.stato.required': 'Campo Stato non puo essere vuoto',
      'utenti.*.isOwner.required': 'Campo proprietario obbligatorio',
      'utenti.*.nome.min': 'Campo Nome Obbligatorio',
      'utenti.*.cognome.min': 'Campo Cognome Obbligatorio',
      'utenti.*.reparto.min': 'Campo Reparto Obbligatorio',
    }
}

}
module.exports = User
