import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CategorieButton extends Component {
  render() {
    const { name, id, call } = this.props;
    /* console.log(id); */
    return (
      <label
        htmlFor={ id }
        data-testid="category"
      >
        { name }
        <input
          data-testid="product"
          type="radio"
          id={ id }
          name="opcoes"
          value={ name }
          onChange={ call }
        />
      </label>
    );
  }
}

CategorieButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  call: PropTypes.func.isRequired,
};
