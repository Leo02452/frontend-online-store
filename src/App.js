import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';
import Finishing from './components/Finishing';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
  }

  componentDidMount() {
    const rec = JSON.parse(localStorage.getItem('qnt'));
    if (!rec) {
      this.setState({ cartList: [] });
    } else {
      this.setState({ cartList: rec });
    }
  }

  addToCart = ({ target }) => {
    const title = target.name;
    const qnt = target.value;
    const obj = {
      title,
      count: 1,
      qnt,
    };
    console.log(obj);
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, obj],
    }), () => {
      const { cartList } = this.state;
      localStorage.setItem('qnt', JSON.stringify(cartList));
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
                render={ (props) => (<ProductDetails
                  { ...props }
                  cartList={ cartList }
                  addToCart={ this.addToCart }
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
                  <Search
                    { ...props }
                    addToCart={ this.addToCart }
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
