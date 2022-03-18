import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Finishing from './pages/Finishing/Finishing';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cartList: cart || [] });
  }

  handleAddToCart = ({ target }) => {
    const title = target.value;
    const obj = {
      title,
      count: 1,
    };
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, obj],
    }), () => {
      const { cartList } = this.state;
      localStorage.setItem('cart', JSON.stringify(cartList));
    });
  };

  render() {
    const { cartList } = this.state;
    return (
      <div className="App">
        <main>
          <BrowserRouter>
            <Switch>
              <Route
                path="/product/:id"
                render={ (props) => (
                  <ProductDetails
                    { ...props }
                    cartList={ cartList }
                    handleAddToCart={ this.handleAddToCart }
                  />) }
              />
              <Route
                path="/shopping-cart"
                render={ (props) => (
                  <ShoppingCart
                    { ...props }
                    cartList={ cartList }
                  />) }
              />
              <Route
                path="/"
                exact
                render={ (props) => (
                  <Home
                    { ...props }
                    handleAddToCart={ this.handleAddToCart }
                    cartList={ cartList }
                  />) }
              />
              <Route
                path="/finishing"
                component={ Finishing }
              />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}
