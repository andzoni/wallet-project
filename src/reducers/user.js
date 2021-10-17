// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_INFO } from '../actions'; // Importa a ACTIONS.TYPE que esta dentro de '../actions' e que sera utilizada.

const INITIAL_STATE = {
  email: '',
  password: '',
}; // Constante para definir um estado inicial (default)

function userReducer(state = INITIAL_STATE, action) { // Funcao para logica do Reducer do User, recebe como parametros o estado(por padrao o estado inical) e a action(importada) que sera utilizada.
  switch (action.type) { // Implementacao de Switch/Case para a logica, chamando como parametro a chave TYPE da Action utilizada.
  case USER_INFO: // Se a chave TYPE for USER_INFO:
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password }; // Retorna o spread do state da action modificando a chave email com o valor correspondente a chave email da chave payload da action, e a chave password com valor correspondente a chave password da chave payload da action.
  default: return state; // Caso default que retona apenas o estado
  }
}

export default userReducer; // Exporta a funcao usertReducer
