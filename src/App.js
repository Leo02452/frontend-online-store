import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Route path="/" component={ Search } exact />
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;
