import {
  LOADING_CURRENCY,
  SUCESS_CURRENCY,
  FAIL_CURRENCY,
  SEND_EXPENSES } from '../actions'; // Importa todas as ACTIONS.TYPE que estao dentro de '../actions' e que serao utilizadas.

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isloading: false,
  error: '',
}; // Constante para definir um estado inicial (default)

function walletReducer(state = INITIAL_STATE, action) { // Funcao para logica do Reducer da Wallet, recebe como parametros o estado(por padrao o estado inical) e a action(uma das importadas) que sera utilizada.
  switch (action.type) { // Implementacao de Switch/Case para a logica, chamando como parametro a chave TYPE da Action utilizada.
  case LOADING_CURRENCY: // Se a chave TYPE for LOADING_CURRENCY:
    return { ...state, isloading: true }; // Retorna o spread do state da action modificando a chave isloading com valor true.
  case SUCESS_CURRENCY: // Se a chave TYPE for SUCESS_CURRENCY:
    return { ...state, currencies: action.payload }; // Retorna o spread do state da action modificando a chave currencies com valor correspondente a chave payload da action referenciada no parametro.
  case FAIL_CURRENCY: // Se a chave TYPE for LOADING_FAIL_CURRENCY:
    return { ...state, error: action.payload.message }; // Retorna o spread do state da action modificando a chave error: com valor correspondente a chave message dentro da chave payload, dentro da action referenciada no parametro.
  case SEND_EXPENSES: // Se a chave TYPE for SEND_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, { ...action.payload, exchangeRates: action.data }] }; // Retorna o spread do state da action modificando a chave expenses que recebe um spread da chave expenses + um objeto contendo uma chave com o spread de payload e uma chave exchangesRate com a chave data da action referenciada no parametro.
  default: return state; // Caso default que retona apenas o estado
  }
}

export default walletReducer; // Exporta a funcao walletReducer
