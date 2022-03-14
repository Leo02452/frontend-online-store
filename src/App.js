import React from 'react';
import './App.css';
<<<<<<< HEAD
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <BrowserRouter>
            <Route path="/" component={ Search } exact />
            <Route path="/cart" component={ Cart } />
            <Route
              path="/product/:id/:name"
              render={ (props) => <ProductDetails { ...props.match.params } /> }
            />
          </BrowserRouter>
        </main>
      </div>
    );
  }
=======
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/shopping-cart" component={ ShoppingCart } />
            <Route path="/" component={ Search } exact />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
>>>>>>> 7e45e5f095460d8533a83ba724f4be9f00edd22e
}

export default App;
