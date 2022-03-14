import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      test: [],
    };
  }

  async componentDidMount() {
    const { name } = this.props;
    const request = await getProductsFromCategoryAndQuery(name, name);
    this.setState({ test: request.results });
  }

  render() {
    const { id } = this.props;
    console.log(id);
    const { test } = this.state;
    console.log(test);
    return (
      <>
        {
          test.map((testes, index) => (
            testes.id === id
              ? (
                <div key={ index }>
                  <img alt=":D" src={ testes.thumbnail } />
                  <p data-testid="product-detail-name">{ testes.title }</p>
                  <p>{ `R$${testes.price}` }</p>
                  <p>{ testes.listing_type_id }</p>
                  <Link to="/">
                    <button type="button">Voltar</button>
                  </Link>
                  <Link data-testid="shopping-cart-button" to="/cart">
                    <button type="button">Carrinho...</button>
                  </Link>
                </div>
              )
              : null
          ))
        }
      </>
    );
  }
}

ProductDetails.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProductDetails;
