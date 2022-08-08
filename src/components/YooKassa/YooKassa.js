import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import FilledInput from '@material-ui/core/FilledInput';
import './styleYooKassa.css';

export default class YooKassa extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <div className="data">
          <FilledInput
            type="tel"
            name="number"
            placeholder="Номер карты"
            className="element"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <FilledInput
            type="text"
            name="name"
            placeholder="Данные владельца"
            className="element"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <div className="data-short">
            <FilledInput
              type="tel"
              name="cvc"
              placeholder="CVC"
              className="element-short"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <FilledInput
              type="tel"
              name="expiry"
              placeholder="Истечение срока"
              className="element-short"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
        </div>
      </div>
    );
  }
}