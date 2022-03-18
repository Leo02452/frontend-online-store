import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import CategorieButton from '../../components/CategorieButton';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      products: [],
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
    this.setState({ search: value });
  }

  handleSearch = async ({ target }) => {
    const { search } = this.state;
    const request = await getProductsFromCategoryAndQuery(target.id, search);
    const { results } = request;
    this.setState({ products: results }, () => {
      this.setState({ textInput: false });
    });
  }

  render() {
    const { categories, loading, products, search, textInput } = this.state;
    const { handleAddToCart, cartList } = this.props;
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
            onClick={ this.handleSearch }
            data-testid="query-button"
          >
            Buscar
          </button>
        </form>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          <p data-testid="shopping-cart-size">{ cartList.length }</p>
          Carrinho
        </Link>
        { textInput && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
        {
          products.length > 0
            ? products.map((product, index) => (
              <div key={ product.id }>
                <Link
                  to={ `/product/${product.id}` }
                  key={ index }
                  data-testid="product-detail-link"
                >
                  <figure data-testid="product">
                    <img
                      id={ product.id }
                      src={ product.thumbnail }
                      alt={ product.title }
                      role="presentation"
                    />
                  </figure>
                  <p data-testid="product-detail-name">{ product.title }</p>
                  {product.shipping.free_shipping
                  && <p data-testid="free-shipping">Frete Grátis</p>}
                  <p>{ `R$${product.price}` }</p>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  value={ product.title }
                  onClick={ handleAddToCart }
                >
                  Adicionar ao carrinho
                </button>
              </div>

            ))
            : (
              <>
                <Link
                  to={ `/product/${search}` }
                  data-testid="product-detail-link"
                />
                <p>Nenhum product foi encontrado</p>
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
                  handleClick={ this.handleSearch }
                />
              ))
          }
        </form>
      </div>
    );
  }
}

Home.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
};
