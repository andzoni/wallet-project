

import getCoins from '../services'; 

export const USER_INFO = 'USER_INFO'; 
export const LOADING_CURRENCY = 'LOADING_CURRENCY'; 
export const SUCESS_CURRENCY = 'SUCESS_CURRENCY'; 
export const FAIL_CURRENCY = 'FAIL_CURRENCY'; 
export const SEND_EXPENSES = 'SEND_EXPENSES'; 

export const sendUserInfo = (payload) => ({ 
  type: USER_INFO, 
  payload, 
});

const isLoading = () => ({ 
  type: LOADING_CURRENCY, 
});

const sucessLoading = (payload) => ({ 
  type: SUCESS_CURRENCY, 
  payload, 
});

const failLoading = (payload) => ({ 
  type: FAIL_CURRENCY, 
  payload, 
});

export const sendExpenses = (payload, data) => ({ 
  type: SEND_EXPENSES, 
  payload, 
  data, 
});



export const fetchCurrency = () => async (dispatch) => { 
  dispatch(isLoading()); 

  try { 
    const coinsObject = await getCoins(); 
    const currencies = Object.keys(coinsObject); 
    const filteredCoins = currencies.filter((currency) => currency !== 'USDT'); 

    return dispatch(sucessLoading(filteredCoins)); 
  } catch (error) { 
    return dispatch(failLoading(error)); 
  }
};

export const fetchExchanges = (payload) => async (dispatch) => { 
  dispatch(isLoading()); 

  try { 
    const data = await getCoins(); 
    return dispatch(sendExpenses(payload, data)); 
  } catch (error) { 
    return dispatch(failLoading(error)); 
  }
};
