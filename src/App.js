import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
  }

  addToCart = ({ target }) => {
    const add = target.value;
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, add],
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
