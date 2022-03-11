import React from 'react';
import './App.css';
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
}

export default App;
