// LOGICA UTILIZADA PARA BUSCAR/UTILIZAR A API //

const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all'; // Constante que encapsula a url da API.

const getCoins = async () => { // Funcao assincrona para utilizar a API de maneira legivel pelo codigo. (Assincrona porque tem que aguardar a resposta do Fetch da API)
  try { // Utiliza a logica Try/Catch (if/else) -Boa Pratica-
    const response = await fetch(CURRENCY_API); // Constante que realiza o Fetch da API (retorna a response da API)
    const result = await response.json(); // Constante para transformar a response obtida, em .json
    return result; // retorna a constante (.json)
  } catch (error) { // caso nao consiga realizar a chamada da API sera lancado uma mensagem de erro.
    console.log(error); // Console.log do erro.
  }
};

export default getCoins; // Exporta a funcao getCoins
