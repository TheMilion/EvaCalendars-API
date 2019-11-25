'use strict'

class Category {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
    }
  }

  get messages () {
    return {
      'nome.required': 'Campo Nome Obbligatorio',
    }
}

}
module.exports = Category
