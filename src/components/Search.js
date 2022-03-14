import React from 'react';
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
      h2: true,
      categories: [],
      loading: false,
      keyboard: '',
      product: [],
      product2: {},
      textInput: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    getCategories();
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

  redirection = () => {
    const { product2, redirect } = this.state;
    if (redirect) {
      return (
        <div>
          <img alt="nada" src={ product2.thumbnail } />
          <p>{ product2.title }</p>
          <p>{ `R$${product2.price}` }</p>
          <p>{ product2.listing_type_id }</p>
          <Redirect to="/product" />
        </div>
      );
    }
  }

  handleClick = async () => {
    const { keyboard } = this.state;
    const request = await getProductsFromCategoryAndQuery(keyboard, keyboard);
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
        <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
        { this.condition() }
        {
          product.length > 0
            ? product.map((produto, index) => (
              <Link
                to={ `/product/${produto.id}/${keyboard}` }
                key={ index }
                data-testid="product-detail-link"
              >
                <figure>
                  <img
                    id={ produto.id }
                    src={ produto.thumbnail }
                    alt={ produto.title }
                    role="presentation"
                  />
                </figure>
                <p>{ produto.title }</p>
                <p>{ `R$${produto.price}` }</p>
              </Link>

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
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
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
