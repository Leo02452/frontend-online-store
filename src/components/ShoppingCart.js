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
              <p data-testid="shopping-cart-product-name">{ item.title }</p>
              <p data-testid="shopping-cart-product-quantity">
                { item.count }
              </p>
            </div>
          ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ShoppingCart;
