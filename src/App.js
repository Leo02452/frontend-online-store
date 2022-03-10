import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <main>
        <Route path="/" component={ Search } exact />
      </main>
    </div>
  );
}

export default App;
