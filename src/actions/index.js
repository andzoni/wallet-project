// Coloque aqui suas actions

import getCoins from '../services'; // Importa a funcao getCoins (request API)

export const USER_INFO = 'USER_INFO'; // Declara e exporta constante contendo a string da Action.type.
export const LOADING_CURRENCY = 'LOADING_CURRENCY'; // Declara e exporta constante contendo a string da Action.type.
export const SUCESS_CURRENCY = 'SUCESS_CURRENCY'; // Declara e exporta constante contendo a string da Action.type.
export const FAIL_CURRENCY = 'FAIL_CURRENCY'; // Declara e exporta constante contendo a string da Action.type.
export const SEND_EXPENSES = 'SEND_EXPENSES'; // Declara e exporta constante contendo a string da Action.type.

export const sendUserInfo = (payload) => ({ // Action para enviar ao estado os dados do Usuario, recebe como parametro o conteudo a ser utilizado.
  type: USER_INFO, // .type referencia da Action
  payload, // Conteudo que sera utilizado (carga de informacoes para o estado global)
});

const isLoading = () => ({ // Action para informar que esta carregando API (fetch)
  type: LOADING_CURRENCY, // .type referencia da Action
});

const sucessLoading = (payload) => ({ // Action para passar o resultado da API chamada no Thunk, recebe como parametro o conteudo a ser utilizado.
  type: SUCESS_CURRENCY, // .type referencia da Action
  payload, // Conteudo que sera utilizado (carga de informacoes)
});

const failLoading = (payload) => ({ // Action para informar que ocorreu um erro, recebe como parametro o conteudo a ser utilizado.
  type: FAIL_CURRENCY, // .type referencia da Action
  payload, // Conteudo que sera utilizado (mensagem de erro)
});

export const sendExpenses = (payload, data) => ({ // Action para enviar ao estado os dados da Wallet, recebe como parametro o conteudo a ser utilizado no estado e um segundo parametro para englobar outro conteudo (API)
  type: SEND_EXPENSES, // .type referencia da Action
  payload, // Conteudo que sera utilizado (carga de informacoes para o estado global)
  data, // Conteudo que sera utilizado (API para o estado global) (Analisar a chave .ask)
});

// THUNKS //

export const fetchCurrency = () => async (dispatch) => { // Declara e exporta funcao/action assincrona(Thunk) que realiza a logica necessaria para dar dispach
  dispatch(isLoading()); // dispacha para o reducer a action 'isLoading' para mostrar que esta carregando, ja que a action necessaria e assincrona.

  try { // Logica de TRY/CHATCH, boa pratica (IF/ELSE)
    const coinsObject = await getCoins(); // Declara constante que recebe a funcao de chamada(objeto inteiro) da API (Importada)(assincrona)
    const currencies = Object.keys(coinsObject); // Declara constante transformando num array de propriedades enumeradas Ex[0: 'UDS', 1: 'USDT' ...]
    const filteredCoins = currencies.filter((currency) => currency !== 'USDT'); // Contante que filtra os elementos do array e retira a chave que nao utilizaremos ('USDT')

    return dispatch(sucessLoading(filteredCoins)); // Retorna um dispatch da action 'sucessLoading' recebendo como parametro o array filtrado.
  } catch (error) { // Catch que realiza o 'else' de error
    return dispatch(failLoading(error)); // Retorna um dispach da action failLoading com a mensagem de erro.
  }
};

export const fetchExchanges = (payload) => async (dispatch) => { // Declara e exporta funcao/action assincrona(Thunk) que realiza a logica necessaria para dar dispach - (recebe como parametro o payload)
  dispatch(isLoading()); // dispacha para o reducer a action 'isLoading' para mostrar que esta carregando, ja que a action necessaria e assincrona.

  try { // Logica de TRY/CHATCH, boa pratica (IF/ELSE)
    const data = await getCoins(); // Declara constante que recebe a funcao de chamada da API (Importada)(assincrona)
    return dispatch(sendExpenses(payload, data)); // Retorna um dispatch da action sendExpenses com parametros contendo o payload e a constante 'data'(contendo o objeto inteiro da API)
  } catch (error) { // Catch que realiza o 'else' de error
    return dispatch(failLoading(error)); // Retorna um dispach da action failLoading com a mensagem de erro.
  }
};
