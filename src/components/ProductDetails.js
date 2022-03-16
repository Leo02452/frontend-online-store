import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';
import ProductForm from './ProductForm';
import Reviews from './Reviews';

class ProductDetails extends React.Component {
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
    const { addToCart, cartList } = this.props;
    const { test, load, reviews } = this.state;
    return (
      <div>
        {
          load
            ? <p>Loading...</p>
            : (
              <div>
                <p data-testid="product-detail-name">{ test.title }</p>
                <img
                  src={ test.thumbnail }
                  alt={ test.title }
                />
                <p>{ `R$${test.price}` }</p>
                <p>{ test.listing_type_id }</p>
                <button
                  data-testid="product-detail-add-to-cart"
                  type="button"
                  value={ test.title }
                  onClick={ addToCart }

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
  addToCart: PropTypes.func.isRequired,
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ProductDetails;
