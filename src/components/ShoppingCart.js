import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: props.cartList,
    };
  }

  handleIncrease = (name) => {
    const { cartList } = this.state;

    const updatedProduct = cartList.map((product) => {
      if (product.title === name) {
        product.count += 1;
      }
      return product;
    });
    this.setState({ cartList: updatedProduct });
  }

  handleDecrease = (name) => {
    const { cartList } = this.state;

    const updatedProduct = cartList.map((product) => {
      if (product.title === name) {
        product.count -= 1;
      }
      return product;
    });
    this.setState({ cartList: updatedProduct });
  }

  render() {
    const { cartList } = this.props;
    return (
      <div>
        {
          cartList.length > 0 ? cartList.map((item, index) => (
            <div key={ index }>
              <button type="button"> X </button>
              <p data-testid="shopping-cart-product-name">{ item.title }</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.handleDecrease(item.title) }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                { item.count }
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.handleIncrease(item.title) }
              >
                +
              </button>
            </div>
          ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
        <Link to="/finishing">
          <button type="button" data-testid="checkout-products">Finalizar compra</button>
        </Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ShoppingCart;
