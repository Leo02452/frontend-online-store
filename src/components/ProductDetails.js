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
              </div>
            )
        }
        <Link to="/shopping-cart">
          <button type="button">Carrinho</button>
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
};

export default ProductDetails;
