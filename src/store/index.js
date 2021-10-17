import { createStore, applyMiddleware } from 'redux'; // Importa descontruindo as funcoes 'createStore' e 'applyMiddleware' da biblioteca 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'; // Importa descontruindo a funcao 'composeWithDevTools' da biblioteca 'redux-devtools-extension'
import thunk from 'redux-thunk'; // Importa o thunk da biblioteca 'redux-thunk'
import rootReducer from '../reducers'; // Importa a funcao rootReducer

const store = createStore( // Cria variavel store utilizando o recurso 'createStore' da biblioteca do redux.
  rootReducer, // Chama o rootReducer dentro da Store, que e o conjunto de todos os reducers criados.
  composeWithDevTools( // Chama o composeWithDevTools dentro da Store, utilizado para a extensao do Chrome.
    applyMiddleware(thunk), // Chama o applyMiddleware que permite usar actions assincronas, utilizando o thunk(action assincrona) como parametro.
  ),
);

export default store; // Exporta a store
