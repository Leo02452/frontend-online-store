import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Route path="/" component={ Search } exact />
          <Route path="/shopping-cart" component={ ShoppingCart } />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
