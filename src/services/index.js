const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

const getCoins = async () => {
  try { 
    const response = await fetch(CURRENCY_API); 
    const result = await response.json(); 
    return result;
  } catch (error) { 
    console.log(error);
  }
};

export default getCoins;
