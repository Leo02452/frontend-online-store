import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategorieButton from './CategorieButton';
import './Search.css';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      keyboard: '',
      product: [],
      categories: [],
      loading: false,
      textInput: true,
    };
  }

  async componentDidMount() {
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

  handleClick = async ({ target }) => {
    const { keyboard } = this.state;
    const request = await getProductsFromCategoryAndQuery(target.id, keyboard);
    const { results } = request;
    this.setState({ product: results }, () => {
      this.setState({ textInput: false });
    });
  }

  handleCategoryValue = ({ target }) => {
    console.log(target.value);
    this.setState({
      keyboard: target.id,
    });
  }

  condition = () => {
    const { textInput } = this.state;
    if (textInput) {
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
    const { categories, loading, product, keyboard } = this.state;
    const { addToCart } = this.props;
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
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Carrinho
        </Link>
        { this.condition() }
        {
          product.length > 0
            ? product.map((produto, index) => (
              <div key={ produto.id }>
                <Link
                  to={ `/product/${produto.id}` }
                  key={ index }
                  data-testid="product-detail-link"
                >
                  <figure data-testid="product">
                    <img
                      id={ produto.id }
                      src={ produto.thumbnail }
                      alt={ produto.title }
                      role="presentation"
                    />
                  </figure>
                  <p data-testid="product-detail-name">{ produto.title }</p>
                  <p>{ `R$${produto.price}` }</p>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  value={ produto.title }
                  onClick={ addToCart }

                >
                  Adicionar ao carrinho
                </button>
              </div>

            ))
            : (
              <>
                <Link
                  to={ `/product/${keyboard}` }
                  data-testid="product-detail-link"
                />
                <p>Nenhum produto foi encontrado</p>
              </>
            )
        }
        <form className="categories-container">
          {
            loading === true ? <p>Carregando...</p>
              : categories.map((categorie) => (
                <CategorieButton
                  key={ categorie.id }
                  name={ categorie.name }
                  id={ categorie.id }
                  handleClick={ this.handleClick }
                />
              ))
          }
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
