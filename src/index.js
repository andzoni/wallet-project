import React from 'react'; // Importa React da biblioteca react
import ReactDOM from 'react-dom'; // Importa ReactDOM da biblioteca rect-dom
import { BrowserRouter } from 'react-router-dom'; // Importa desconstruindo o BrowserRouter da biblioteca react-router-dom
import './index.css'; // Importa o CSS para estilizacao da pagina
import { Provider } from 'react-redux'; // Importa desconstruindo o Provider da biblioteca react-redux
import App from './App'; // Importa o componente App
import * as serviceWorker from './serviceWorker'; // Importa serviceWorker
import store from './store'; // Importa a Store do componente(?) store

ReactDOM.render( // Funcao para renderizar usando ReactDOM
  // Utiliza o BrowserRouter para habilitar a funcao de rotas dentro do component <App />
  <BrowserRouter>
    {/* Utiliza o Provider para definir a store no estado global para o projeto */}
    <Provider store={ store }>
      {/* Renderiza o componente <App /> */}
      <App />
    </Provider>
  </BrowserRouter>,
  // Parametro que define onde sera renderizado (na div root)
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
