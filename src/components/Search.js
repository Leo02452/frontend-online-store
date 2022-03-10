import React from 'react';
import { getCategories } from '../services/api';
import CategorieButton from './CategorieButton';
// import './Search.css';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getCategories();
      this.setState({
        categories: result,
        loading: false,
      });
    });
  }

  render() {
    const { categories, loading } = this.state;
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
        <nav className="categories-container">
          {
            loading === true ? <p>Carregando...</p>
              : categories.map((categorie) => (
                <CategorieButton
                  key={ categorie.id }
                  name={ categorie.name }
                  id={ categorie.id }
                />))
          }
        </nav>
      </div>
    );
  }
}
