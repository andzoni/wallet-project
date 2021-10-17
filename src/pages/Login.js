import PropTypes from 'prop-types'; // Importa o Proptypes da biblioteca prop-types
import React from 'react'; // Importa React da biblioteca react
import { connect } from 'react-redux'; // Importa desconstruindo connect da biblioteca react-redux
import { Redirect } from 'react-router-dom'; // Importa desconstruindo Redirect da biblioteca react-router-dom
import { sendUserInfo } from '../actions'; // Importa desconstruindo sendUserInfo das actions

class Login extends React.Component { // Cria o componente de Classe
  constructor(props) { // Cria o constructor recebendo props como parametro
    super(props); // Chama o super com as props como parametro(logica necessaria do contructor) (Faz o construtor desse componente interagir com a classe pai)
    this.state = {
      authEmail: true,
      authPassword: true,
      email: '',
      password: '',
      shouldRedirect: false,
    }; // Declara o estado(inicial) do componente.
    this.validateEmail = this.validateEmail.bind(this); // Bind da funcao validateEmail para esta acessar o .this
    this.validatePassword = this.validatePassword.bind(this); // Bind da funcao validadePassword para esta acessar o .this
    this.formSubmit = this.formSubmit.bind(this); // Bind da funcao formSubmit para esta acessar o .this
  }

  formSubmit(event) { // Funcao de submissao do formulario, recebe como parametro o evento realizado
    event.preventDefault(); // Previne que a pagina seja atualizada(praxe do default)
    const { email, password } = this.state; // Descontroi a chave 'email' e password' do objeto do estado.
    const { submitUser } = this.props; // Descontroi a funcao submitUser da props (Que foi inserida como props na logica do MapDisptchToProps na linha 102-103)
    submitUser(({ email, password })); // Utiliza a funcao passando como parametro o email e password vindos do estado local, enviando para o estado global
    this.setState({ shouldRedirect: true }); // Seta o a chave 'shouldRedirect' do estado, mudando de false para true
  }

  validateEmail({ target }) { // Funcao para validacao do Email
    const { value } = target; // Descontroi o valor adicionado pelo parametro (Informacao recebida do user pelo input)
    const regex = /\S+@\S+\.\S+/; // Declara constante com regex para validar o email ('string'@'string'.'string'). Fonte: Gesse Carlos Turma 13A - Trybe
    if (regex.test(value)) { // Logica IF/ELSE para testar se a constante regex comparada com o value e true ou false.
      return this.setState({ // Se passar no test do regex, o estado sera setado:
        authEmail: false, // Chave authEmail muda de true pra false
        email: value, // Chave email recebe o valor inserido no input
      });
    }
    return this.setState({ // Se nao passar no test do regex o estato sera setado:
      authEmail: true, // Chave authEmail fica como true
      email: value, // Chave email recebe o valor inserido no input
    });
  }

  validatePassword({ target }) { // Funcao para validacao do Email
    const { value } = target; // Descontroi o valor adicionado pelo parametro (Informacao recebida do user pelo input)
    const MIN_LENGTH_PASSWORD = 6; // Declara o tamanho minimo para o password (magic number - lint)
    if (value.length >= MIN_LENGTH_PASSWORD) { // Logica IF/ELSE para testar se a string passada pelo input tem o tamanho minimo necessario
      return this.setState({ // Se o value tiver o tamanho minimo necessario, o estado sera setado:
        authPassword: false, // Chave authPassword muda de true pra false
        password: value, // Chave password recebe o valor inserido no input
      });
    }
    return this.setState({ // Se nao nao tiver o tamanho minimo, o estato sera setado:
      authPassword: true, // Chave authPassword muda fica como true
      password: value }); // Chave password recebe o valor inserido no input
  }

  render() { // Rederiza o componente
    const { authEmail, authPassword, shouldRedirect } = this.state; // Constante que desconstroi as chaves especificas do estado
    if (shouldRedirect) return <Redirect to="/carteira" />; // Logica IF/ELSE para redirecionar para o componente wallet, caso a chave 'shouldRedirect' do estado, seja True.
    return ( // Caso a chave 'shouldRedirect' do estado, seja False, sera rederizado proprio component com o formulario, ate que os requisitos necessarios sejam preenchidos corretamente.
    // Fomulario que recebe a funcao formSubmit no requisicao do onSubmit
    // Inputs de EMAIL e SENHA recebendo os respectivos 'data-testid' e sendo linkado per 'htmlFor' da label e seu 'id', e tambem recebendo as suas funcoes necessarias no onChange.
    // Botao recebendo a logica para ficar disable caso as respectivas chaves nao estejam 'false'
      <form className="forms" onSubmit={ this.formSubmit }>
        <label htmlFor="login">
          Email:
          <input
            id="login"
            type="text"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.validateEmail }
          />
        </label>
        <label htmlFor="pass">
          Senha:
          <input
            id="pass"
            type="password"
            data-testid="password-input"
            placeholder="******"
            onChange={ this.validatePassword }
          />
        </label>
        <button
          disabled={ authEmail || authPassword }
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = { // Declaracao das PropTypes
  submitUser: PropTypes.func, // A prop submitUser e uma funcao
}.isRequired; // E requerida que a prop tenha esse tipo

const mapDispachToProps = (dispatch) => ({ // Constante que recebe funcao do redux para dispachar a logica da action como Props do componente
  submitUser: (payload) => dispatch(sendUserInfo(payload)), // Funcao(Props) que recebe uma callback com parametro 'payload' para despachar a action 'sendUserInfo' para modificar o estado global
});
export default connect(null, mapDispachToProps)(Login); // Exporta o componente usando a logica 'connect' que vem do redux que recebe como primeiro parametro uma possivel leitura/captura do estao global para o componente(que nao e utilizado aqui), e como segundo parametro recebe a funcao que dispacha o estado do componente para o estado global. Conectando ao componente Login.
