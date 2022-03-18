import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CategorieButton extends Component {
  render() {
    const { name, id, handleClick } = this.props;
    return (
      <label
        htmlFor={ id }
        data-testid="category"
      >
        { name }
        <input
          type="radio"
          id={ id }
          name="category"
          value={ name }
          onClick={ handleClick }
        />
      </label>
    );
  }
}

CategorieButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
