import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <BrowserRouter>
            <Switch>
              <Route
                path="/product/:id"
                render={ (props) => <ProductDetails { ...props } /> }
              />
              <Route path="/shopping-cart" component={ ShoppingCart } />
              <Route path="/" component={ Search } exact />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default App;
