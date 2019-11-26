class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      "utenti": 'required|array|min:1',
      "utenti.*.id_user": 'required|integer',
      "utenti.*.stato": 'required|integer',
      "utenti.*.isOwner": 'required|integer',
      "utenti.*.nome": 'min:1',
      "utenti.*.cognome": 'min:1',
      "utenti.*.email": 'email',
    }
  }

  get messages () {
    return {
      'utenti.*.id_user.required': 'Campo id_user non puo essere vuoto ',
      'utenti.*.stato.required': 'Campo Stato non puo essere vuoto',
      'utenti.*.isOwner.required': 'Campo proprietario obbligatorio',
      'utenti.*.nome.min': 'Campo Nome Obbligatorio',
      'utenti.*.cognome.min': 'Campo Cognome Obbligatorio',
      'utenti.*.reparto.min': 'Campo Reparto Obbligatorio',
    }
}

}
module.exports = User
