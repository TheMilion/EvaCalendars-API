'use strict'
const Validator = use('Validator')
const Database = use('Database')

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field)
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
    //PATCH
    if(this.ctx.params.id) return {
      
      title: 'min:1',
      id_category: 'integer|exists:categories,id',
      id_location: 'integer|exists:locations,id',
      date_from: 'min:1|date',
      date_to: 'min:1|date',
      hour_from: 'min:1',
      hour_to: 'min:1',
      note: 'min:1',
    }
    //POST
    else return {
      title: 'required',
      id_category: 'min:1|integer|exists:categories,id',
      id_location: 'min:1|integer|exists:locations,id',
      id_creator: 'required|integer|exists:users,id',
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
      'title.min': 'Titolo obbligatorio',
      'date_from.required': 'Campo Data inizio obbligatoria',
      'date_to.required': 'Campo Data fine obbligatoria',
      'date_from.min': 'Campo Data inizio obbligatoria',
      'date_to.min': 'Campo Data fine obbligatoria',
      'hour_from.required': 'Campo ora inizio obbligatoria',
      'hour_to.required': 'Campo ora fine obbligatoria',
      'hour_from.min': 'Campo ora inizio obbligatoria',
      'hour_to.min': 'Campo ora fine obbligatoria',
      'note.min': 'Campo note non puo essere vuoto se inserito',
      'id_location.min': 'Campo location non puo essere vuoto se inserito',
      'id_location.integer': 'Campo location deve essere intero',
      'id_location.exists': 'Location non esistente',
      'id_category.integer': 'Campo Categorie deve essere intero',
      'id_category.min': 'Campo categorie non puo essere vuoto se inserito',
      'id_category.exists': 'Categoria non esistente',
      'id_creator.integer': 'Campo Categorie deve essere intero',
      'id_creator.required': 'Campo creatore obbligatorio',
      'id_creator.exists': 'Users non esistente',
    }
}

}
module.exports = User
