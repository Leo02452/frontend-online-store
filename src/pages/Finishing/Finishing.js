import React, { Component } from 'react';

export default class Finishing extends Component {
  render() {
    return (
      <div>
        <h1>Formulário de finalização</h1>
        <input type="text" data-testid="checkout-fullname" />
        <input type="text" data-testid="checkout-email" />
        <input type="text" data-testid="checkout-cpf" />
        <input type="text" data-testid="checkout-phone" />
        <input type="text" data-testid="checkout-cep" />
        <input type="text" data-testid="checkout-address" />
      </div>
    );
  }
}
