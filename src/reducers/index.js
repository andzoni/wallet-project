import { combineReducers } from 'redux'; // Importa desconstruindo combineReducers da biblioteca redux
import user from './user'; // Importa o reducer user
import wallet from './wallet'; // Importa o reducer wallet

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducers = combineReducers({ // Cria a constante funcao rootReducerts que recebe a combineReducer com parametro sendo um Objeto contendo os Reducer importados. Dessa forma a constante combina os dois reducers em um so local.
  user, // Reducer importado
  wallet, // Reducer importado
});

export default rootReducers; // Exporta a funcao rootReducer
