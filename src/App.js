import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ Search } exact />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
