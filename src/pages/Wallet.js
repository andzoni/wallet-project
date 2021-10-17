import PropTypes from 'prop-types'; // Importa o Proptypes da biblioteca prop-types
import React from 'react'; // Importa React da biblioteca react
import { connect } from 'react-redux'; // Importa desconstruindo connect da biblioteca react-redux
import { fetchCurrency, fetchExchanges } from '../actions'; // Importa desconstruindo fetchCurrency e fetchExchanges das actions

class Wallet extends React.Component { // Cria o componente de Classe
  constructor(props) { // Cria o constructor recebendo props como parametro
    super(props); // Chama o super com as props como parametro(logica necessaria do contructor) **********
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'BRL',
      method: '',
      tag: '',
    }; // Declara o estado(inicial) do componente.
    this.renderHeader = this.renderHeader.bind(this); // Bind da funcao renderHeader para esta acessar o .this
    this.renderForm = this.renderForm.bind(this); // Bind da funcao renderForm para esta acessar o .this
    this.hChange = this.hChange.bind(this); // Bind da funcao hChange para esta acessar o .this
    this.formSubmit = this.formSubmit.bind(this); // Bind da funcao formSubmit para esta acessar o .this
    this.sumExpenses = this.sumExpenses.bind(this); // Bind da funcao sumExpenses para esta acessar o .this
  }

  componentDidMount() { // Funcao para montar o component
    const { fetchData } = this.props; // Descontroi a funcao fetchData da props (Que foi inserida como props na logica do MapDisptchToProps na linha 148-149)
    fetchData(); // Funcao para renderizar o dispatch o Thunk(action) que vai fornecer a chave currencies com value contendo um array das currencies sem o 'USDT'
  }

  hChange({ target }) { // Funcao handleChange que recebe o target como parametro (Valor que o usuario insere no respectivo input )
    const { id, value } = target; // Desconstroi a id e o value do input, de dentro do target.
    this.setState({ // Seta o estado:
      [id]: value, // Pega a id do input utlizado pra ser uma chave e usa o value inserido no input como value da chave.
    });
  }

  formSubmit(event) { // Funcao de submissao do formulario, recebe como parametro o evento realizado
    event.preventDefault(); // Previne que a pagina seja recarregada(praxe do default)
    const { buttonExpenses } = this.props; // Descontroi a funcao buttonExpenses da props (Que foi inserida como props na logica do MapDisptchToProps na linha 148 e 151)
    const { id, value, description, currency, method, tag } = this.state; // Descontroi as respectivas chaves do objeto do estado.
    const estado = { id, value, description, currency, method, tag }; // Cria constante englobando as chaves descontruidas do estado.
    buttonExpenses(estado); // Utiliza a funcao passando como parametro a constante que contem as chaves vindas do estado local, enviando estas para o estado global
    this.setState({ // Seta o estado:
      id: id + 1, // Muda a chave id para id+1, de forma que a proxima expense a ser adicionada tenha uma id diferente da anterior, nao causando conflitos.
    });
  }

  sumExpenses() { // Funcao para somar os gastos
    let count = 0; // Declara variavel com valor 0 para englobar as despesas
    const { cotation } = this.props; // Desconstroi o cotation que vem do estado global, que foi inserido nas props para o acesso no componente atual por meio do mapStateToProps (Linha 144 e 147)

    // Realiza uma logica de forEach+IF/ELSE no cotation. Para cada elemento percorrido do array ele vai verificar o index 'currency' dentro exchangeRates - Ex: USD.
    cotation.forEach(({ value, currency = 'USD', exchangeRates }) => {
      if (exchangeRates[currency]) {
        count += (Number(value) * Number(exchangeRates[currency].ask)); // Adiciona dentro da variavel 'count' o valor em Numero de value vezes o valor em Numero da chave .ask da currency dentro de exchangeRates - Ex: 1000(value) x 5.3331(USD.ask) -- Count = 5333,1 (BRL)
        return count; // Retorna a variavel count
      }
      return count; // Else, retorna a variavel count
    });
    return count.toFixed(2); // retorna a variavel count e fixa o valor para apenas duas casas decimais depois da virgula. Ex: 5333,10
  }

  renderHeader() { // Funcao para renderizar o Header (Lint reclamou de linhas)
    const { emailInput } = this.props; // Desconstroi o emailInput que vem do estado global, que foi inserido nas props para o acesso no componente atual por meio do mapStateToProps (Linha 144 e 145)
    return ( // Retorna o Header com 3 sections com suas respectivas data-testid.
      // O email recebendo o email vindo do estado global
      // As despesas recebendo o resultado da logica da funcao 'sumExpenses'
      <header>
        <section data-testid="email-field">{emailInput}</section>
        <section data-testid="total-field">{this.sumExpenses()}</section>
        <section data-testid="header-currency-field">BRL</section>
      </header>
    );
  }

  renderForm() { // Funcao para renderizar o Form (Lint reclamou de linhas)
    const { moedas } = this.props; // Desconstroi moedas que vem do estado global, que foi inserido nas props para o acesso no componente atual por meio do mapStateToProps (Linha 144 e 145)
    const { value, description, currency, method, tag } = this.state; // Descontroi as respectivas chaves do estado local
    return ( // Retorna o form com cada Input recebendo o seu respectivo VALUE-ID-TYPE e no onChange recebendo a funcao para realizar a logica para setar o estado com os novos valores vindos do input
      // O input de MOEDA recebe uma logica de map para percorrer o array com as diferentes moedas fornecido pelo estado global 'moedas'. Ex: USD, GBP, ...
      <article>
        <form onSubmit={ this.formSubmit }>
          <label htmlFor="value">
            Valor
            <input onChange={ this.hChange } type="text" id="value" value={ value } />
          </label>
          <label htmlFor="description">
            Descrição
            <input onChange={ this.hChange } id="description" value={ description } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select onChange={ this.hChange } id="currency" value={ currency }>
              {moedas.map((moeda) => (
                <option
                  key={ moeda }
                  value={ moeda }
                >
                  {moeda}
                </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select onChange={ this.hChange } type="text" id="method" value={ method }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select onChange={ this.hChange } type="text" id="tag" value={ tag }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
      </article>
    );
  }

  render() { // Renderiza o componente com as funcoes do Header e do Forms
    return (
      <main>
        {this.renderHeader()}
        <section>
          {this.renderForm()}
        </section>
      </main>
    );
  }
}

Wallet.propTypes = { // Declaracao das PropTypes
  buttonExpenses: PropTypes.func, // A prop buttonExpenses e uma funcao
  emailInput: PropTypes.string, // A prop emailInput e uma string
  fetchData: PropTypes.func, // A prop fetchData e uma funcao
  moedas: PropTypes.shape({ // Define o formato especifico de cada chave
    map: PropTypes.func, // A prop map e uma funcao
  }),
}.isRequired; // E requerida que a prop tenha esse tipo

const mapStateToProps = (state) => ({ // Constante que captura o estado global do redux para leitura e utlizacao do mesmo no componente, como Props.
  emailInput: state.user.email, // Chave declarada pra receber o estado global
  moedas: state.wallet.currencies, // Chave declarada pra receber o estado global
  cotation: state.wallet.expenses, // Chave declarada pra receber o estado global
});

const mapDispatchToProps = (dispatch) => ({ // Constante que recebe funcao do redux para dispachar a logica da action como Props do componente
  fetchData: () => dispatch(fetchCurrency()), // Funcao(Props) que recebe uma callback para despachar a action 'fetchCurrency' que vai fornecer a chave currencies com value contendo um array das currencies sem o 'USDT'
  buttonExpenses: (payload) => dispatch(fetchExchanges(payload)), // Funcao(Props) que recebe uma callback com parametro 'payload' para despachar a action 'fetchExchanges' para modificar a chave expenses no estado global
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet); // Exporta o componente usando a logica 'connect' que vem do redux que recebe como primeiro parametro uma leitura/captura do estao global para o componente(mapStateToProps), e como segundo parametro recebe a funcao que dispacha o estado do componente para o estado global(mapDispatchToProps). Conectando ao componente Wallet.
