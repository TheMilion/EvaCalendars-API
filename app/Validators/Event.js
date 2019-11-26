'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      id_category: 'min:1|integer|unique:categories',
      id_location: 'min:1|integer',
      id_creator: 'required|integer',
      date_from: 'required',
      date_to: 'required',
      hour_from: 'required',
      hour_to: 'required',
      note: 'min:1',
    }
  }

  get messages () {
    return {
      'title.required': 'Titolo obbligatorio',
      'date_from.required': 'Campo Data inizio obbligatoria',
      'date_to.required': 'Campo Data fine obbligatoria',
      'hour_from.required': 'Campo ora inizio obbligatoria',
      'hour_to.required': 'Campo ora fine obbligatoria',
      'note.min': 'Campo note non puo essere vuoto se inserito',
      'id_location.min': 'Campo location non puo essere vuoto se inserito',
      'id_location.integer': 'Campo location deve essere intero',
      'id_category.integer': 'Campo Categorie deve essere intero',
      'id_category.min': 'Campo categorie non puo essere vuoto se inserito',
      'id_creator.integer': 'Campo Categorie deve essere intero',
      'id_creator.required': 'Campo creatore obbligatorio',
    }
}

}
module.exports = User
