import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
          />
        </form>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">CARR</Link>
        <h2 data-testid="home-initial-message">
          Digite
          algum termo de pesquisa ou escolha uma categoria.
        </h2>
      </div>
    );
  }
}
