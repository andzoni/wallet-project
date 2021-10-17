// PROJETO FEITO EM GRANDE PARTE EM CONJUNTO COM COLEGAS DE CLASSE DA TURMA13A DA TRYBE (LEONARDO DOS SANTOS, GABRIEL LENZ, CARLOS LIMA E GESSE CARLOS) VIA DISCORD. //

import React from 'react'; // Importa React da biblioteca react
import { Switch, Route } from 'react-router-dom'; // Importa desconstruindo Switch e Route da biblioteca react-router-dom
import Login from './pages/Login'; // Importa o componente pages Login
import Wallet from './pages/Wallet'; // Importa o componente pages Wallet
import './App.css'; // Importa o CSS para estilizacao da pagina

function App() { // Funcao para renderizar o App
  return ( // Retorno da Funcao
    // Switch para englobar os componentes a serem renderizados usando uma logica interna da biblioteca (simula um switch/case)
    <Switch>
      {/* Renderiza o componente dentro do Route para criar uma rota ao componente */}
      {/* O 'exact' e utilizado para delimitar uma rota precisa */}
      {/* O 'path' e para descrever a rota desejada */}
      {/* O 'component' e para descrever qual componente ira seguir a rota */}
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App; // Exporta o conteudo do componente
