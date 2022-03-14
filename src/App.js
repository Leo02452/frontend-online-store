import React from 'react';
import './App.css';
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
}

export default App;
