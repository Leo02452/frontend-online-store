import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategorieButton from './CategorieButton';
import './Search.css';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      keyboard: '',
      product: [],
      h2: true,
      categories: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getCategories();
      this.setState({
        categories: result,
        loading: false,
      });
    });
  }
  
  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ keyboard: value });
  }

  handleClick = async () => {
    const { keyboard } = this.state;
    const request = await getProductsFromCategoryAndQuery(keyboard, keyboard);
    const { results } = request;
    this.setState({ product: results }, () => {
      this.setState({ h2: false });
    });
  }

  condition = () => {
    const { h2 } = this.state;
    if (h2) {
      return (
        <h2 data-testid="home-initial-message">
          Digite
          algum termo de pesquisa ou escolha uma categoria.
        </h2>
      );
    }
    return null;
  }

  render() {
    const { categories, loading, product } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="query-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="query-button"
          >
            Buscar
          </button>
        </form>
        { this.condition() }
        {
          product.length > 0
            ? product.map((produto, index) => (
              <div key={ index } data-testid="product">
                <figure key={ produto.category_id }>
                  <img
                    src={ produto.thumbnail }
                    alt={ produto.title }
                  />
                </figure>
                <p>{ produto.title }</p>
                <p>{ `R$${produto.price}` }</p>
              </div>
            ))
            : <p>Nenhum produto foi encontrado</p>
        }
        <h2 data-testid="home-initial-message">
          Digite
          algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <nav className="categories-container">
          {
            loading === true ? <p>Carregando...</p>
              : categories.map((categorie) => (
                <CategorieButton
                  key={ categorie.id }
                  name={ categorie.name }
                  id={ categorie.id }
                />))
          }
        </nav>
      </div>
    );
  }
}
