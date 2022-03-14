import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { cartList } = this.props;
    return (
      <div>
        {
          cartList.length > 0 ? cartList.map((item, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{ item }</p>
              <input type="number" data-testid="shopping-cart-product-quantity" value="1" />
            </div>
          ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShoppingCart;
