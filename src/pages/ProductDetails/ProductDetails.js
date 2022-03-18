import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductId } from '../../services/api';
import ProductForm from '../../components/ProductForm';
import Reviews from '../../components/Reviews';

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      test: {},
      load: false,
      reviews: [],
      currentReview: {
        email: '',
        rating: '',
        evaluation: '',
      },
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    this.setState({ reviews: reviews || [] });
    this.setState({ load: true });
    const request = await getProductId(id);
    this.setState({ test: request, load: false });
  }

  handleSaveReview = (event) => {
    const { currentReview } = this.state;
    event.preventDefault();
    this.setState((prevState) => ({
      reviews: [...prevState.reviews, currentReview],
      currentReview: {
        email: '',
        rating: '',
        evaluation: '',
      },
    }), () => {
      const { reviews } = this.state;
      localStorage.setItem('reviews', JSON.stringify(reviews));
    });
  }

  handleChangeInput = ({ target }) => {
    const { value, name } = target;
    this.setState((prevState) => ({
      currentReview: {
        ...prevState.currentReview,
        [name]: value,
      },
    }));
  }

  render() {
    const { handleAddToCart, cartList } = this.props;
    const { test, load, reviews } = this.state;
    const isFreeShipping = test.shipping && test.shipping.free_shipping;
    const count = 7;
    return (
      <div>
        {
          load
            ? <p>Loading...</p>
            : (
              <div>
                <p data-testid="product-detail-name">{ test.title }</p>
                {isFreeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
                <img
                  src={ test.thumbnail }
                  alt={ test.title }
                />
                <p>{ `R$${test.price}` }</p>
                <p>{ test.listing_type_id }</p>
                <button
                  data-testid="product-detail-add-to-cart"
                  type="button"
                  onClick={ handleAddToCart }
                  name={ test.title }
                  value={ count }

                >
                  Adicionar ao carrinho
                </button>
              </div>
            )
        }
        <Link to="/shopping-cart">
          <button data-testid="shopping-cart-button" type="button">Carrinho</button>
          <p data-testid="shopping-cart-size">{ cartList.length }</p>
        </Link>
        <ProductForm
          onClickButton={ this.handleSaveReview }
          onInputChange={ this.handleChangeInput }
        />
        {reviews.map((review, index) => (
          <Reviews
            key={ index }
            review={ review }
          />
        ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
};
