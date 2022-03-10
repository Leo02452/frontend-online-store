import React from 'react';

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
          />
        </form>
        <h2 data-testid="home-initial-message">
          Digite
          algum termo de pesquisa ou escolha uma categoria.
        </h2>
      </div>
    );
  }
}
