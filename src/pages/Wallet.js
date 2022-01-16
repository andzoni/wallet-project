import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, fetchExchanges } from '../actions'
import { Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'BRL',
      method: '',
      tag: '',
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderForm = this.renderForm.bind(this); 
    this.hChange = this.hChange.bind(this); 
    this.formSubmit = this.formSubmit.bind(this); 
    this.sumExpenses = this.sumExpenses.bind(this); 
  }

  componentDidMount() { 
    const { fetchData } = this.props; 
    fetchData(); 
  }

  hChange({ target }) { 
    const { id, value } = target; 
    this.setState({ 
      [id]: value, 
    });
  }

  formSubmit(event) { 
    event.preventDefault(); 
    const { buttonExpenses } = this.props; 
    const { id, value, description, currency, method, tag } = this.state; 
    const estado = { id, value, description, currency, method, tag }; 
    buttonExpenses(estado); 
    this.setState({ 
      id: id + 1, 
    });
  }

  sumExpenses() { 
    let count = 0; 
    const { cotation } = this.props; 

    
    cotation.forEach(({ value, currency = 'USD', exchangeRates }) => {
      if (exchangeRates[currency]) {
        count += (Number(value) * Number(exchangeRates[currency].ask)); 
        return count; 
      }
      return count; 
    });
    return count.toFixed(2); 
  }

  renderHeader() { 
    const { emailInput } = this.props; 
    return ( 
      
      <div className='div1'>
        <h3 className='forms'>
          <Badge bg="success">Wallet Project</Badge>
        </h3>
        <header className='forms'>
          <section data-testid="email-field">{emailInput}</section>
          <section data-testid="total-field">{this.sumExpenses()}</section>
          <section data-testid="header-currency-field">BRL</section>
        </header>
      </div>
    );
  }

  renderForm() { 
    const { moedas } = this.props; 
    const { value, description, currency, method, tag } = this.state; 
    return ( 
      
      <article>
        <div className='div1'>
          <Form className='forms' onSubmit={ this.formSubmit }>
            <Form.Group 
              className="mb-3"  
            >
              <Form.Label 
                htmlFor="value"
              >
                Value
              </Form.Label>
              <Form.Control
                id="value" 
                type="text" 
                value={ value }
                data-testid="email-input"
                placeholder="Enter email"
                onChange={ this.hChange } 
              />
            </Form.Group>

            <Form.Group 
              className="mb-3"
            >
              <Form.Label 
                htmlFor="description"
              >
                Description
              </Form.Label>
              <Form.Control 
                id="description" 
                type="text"
                data-testid="password-input"
                onChange={ this.hChange } 
                value={ description }
              />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label htmlFor="Currency">Currency</Form.Label>
            <Form.Select 
              onChange={ this.hChange } 
              id="currency" 
              value={ currency }
            >
                { moedas.map((moeda) => (
                  <option
                    key={ moeda }
                    value={ moeda }
                  >
                    {moeda}
                  </option>)) }
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label htmlFor="method">Payment method</Form.Label>
            <Form.Select 
              onChange={ this.hChange } 
              id="method" 
              value={ method }
            >
              <option value="Dinheiro">Cash</option>
              <option value="Cartão de crédito">Credit Card</option>
              <option value="Cartão de débito">Debit Card</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label htmlFor="tag">Tag</Form.Label>
            <Form.Select 
              onChange={ this.hChange } 
              id="tag" 
              value={ tag }
            >
              <option value="Food">Food</option>
              <option value="Leisure">Leisure</option>
              <option value="Work">Work</option>
              <option value="Transport">Transport</option>
              <option value="Healthy">Healthy</option>
            </Form.Select>
            </Form.Group>


            <Button
              variant="success" 
              type="submit"
            >
              Add Expenditure 
            </Button>
          </Form>
          <br/>
          <div className='forms'>
            <Button
              variant="danger" 
              type="button"
            >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/"> Logout</Link>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  render() { 
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

Wallet.propTypes = { 
  buttonExpenses: PropTypes.func, 
  emailInput: PropTypes.string, 
  fetchData: PropTypes.func, 
  moedas: PropTypes.shape({ 
    map: PropTypes.func, 
  }),
}.isRequired; 

const mapStateToProps = (state) => ({ 
  emailInput: state.user.email, 
  moedas: state.wallet.currencies, 
  cotation: state.wallet.expenses, 
});

const mapDispatchToProps = (dispatch) => ({ 
  fetchData: () => dispatch(fetchCurrency()), 
  buttonExpenses: (payload) => dispatch(fetchExchanges(payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet); 
