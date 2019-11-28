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


'use strict'

class Group {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      "utenti": 'required|array|min:1',
      "utenti.*.id_user": 'required|integer|exists:users,id',
      "utenti.*.id_group": 'required|integer|exists:groups,id',
    }
  }

  get messages () {
    return {
      'utenti.*.id_user.required': 'Campo id_user non puo essere vuoto ',
      'utenti.*.id_groups.required': 'Campo id_user non puo essere vuoto ',
      'utenti.*.id_user.exists' : 'utente non esistente',
      "utenti.*.id_groups.exists": 'gruppo non esistente',
    }
}

}
module.exports = Group
