import React, { Component } from 'react';

export default class ProductForm extends Component {
  render() {
    return (
      <form>
        <input type="email" data-testid="product-detail-email" placeholder="E-mail" />
        <input type="radio" data-testid="1-rating" value="1" />
        <input type="radio" data-testid="2-rating" value="2" />
        <input type="radio" data-testid="3-rating" value="3" />
        <input type="radio" data-testid="4-rating" value="4" />
        <input type="radio" data-testid="5-rating" value="5" />
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
        />
        <button type="submit" data-testid="submit-review-btn">Avaliar</button>
      </form>
    );
  }
}
