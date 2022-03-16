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
          name="email"
          onChange={ onInputChange }
        />
        <label htmlFor="rating">
          <input
            type="radio"
            name="rating"
            data-testid="1-rating"
            value="1"
            onChange={ onInputChange }
          />
          <input
            type="radio"
            name="rating"
            data-testid="2-rating"
            value="2"
            onChange={ onInputChange }
          />
          <input
            type="radio"
            name="rating"
            data-testid="3-rating"
            value="3"
            onChange={ onInputChange }
          />
          <input
            type="radio"
            name="rating"
            data-testid="4-rating"
            value="4"
            onChange={ onInputChange }
          />
          <input
            type="radio"
            name="rating"
            data-testid="5-rating"
            value="5"
            onChange={ onInputChange }
          />
        </label>
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
          onChange={ onInputChange }
          name="evaluation"
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
