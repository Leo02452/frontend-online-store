import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
  }

  addToCart = ({ target }) => {
    const title = target.value;
    const obj = {
      title,
      count: 1,
    };
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, obj],
    }));
  }

  render() {
    const { cartList } = this.state;
    return (
      <div className="App">
        <main>
          <BrowserRouter>
            <Switch>
              <Route
                path="/product/:id"
                render={ (props) => <ProductDetails { ...props } /> }
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
                  <Search
                    { ...props }
                    addToCart={ this.addToCart }
                  />) }
              />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}
