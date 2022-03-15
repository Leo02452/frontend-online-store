import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      test: {},
      load: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ load: true });
    const request = await getProductId(id);
    this.setState({ test: request, load: false });
  }

  render() {
    const { addToCart, cartList } = this.props;
    const { test, load } = this.state;
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
