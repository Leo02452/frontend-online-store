import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductForm extends Component {
  render() {
    const { onClickButton, onInputChange } = this.props;
    return (
      <form>
        <input
          type="email"
          data-testid="product-detail-email"
          placeholder="E-mail"
          onChange={ onInputChange }
        />
        <label htmlFor="rating">
          <input type="radio" name="rating" data-testid="1-rating" value="1" />
          <input type="radio" name="rating" data-testid="2-rating" value="2" />
          <input type="radio" name="rating" data-testid="3-rating" value="3" />
          <input type="radio" name="rating" data-testid="4-rating" value="4" />
          <input type="radio" name="rating" data-testid="5-rating" value="5" />
        </label>
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
          onChange={ onInputChange }
        />
        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ onClickButton }
        >
          Avaliar
        </button>
      </form>
    );
  }
}

ProductForm.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
