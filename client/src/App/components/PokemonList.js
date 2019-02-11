import React from 'react';

import PokemonCard from './PokemonCard';
import Spinner from './Spinner';
import Alert from './Alert';

class PokemonList extends React.Component {
  state = {
    pokemon: [],
    filteredPokemon: [],
    fetchingError: false,
    searchText: '',
    isLoading: true,
  };

  componentDidMount = () => {
    fetch('/api/pokemon/all')
      .then(response => response.json())
      .then(data => this.setState({ 
          pokemon: data.results,
          isLoading: false, 
        }))
      .catch(() => { 
        this.setState({ 
          fetchingError: true,
          isLoading: false,
        });
      });
  }

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
    const regex = new RegExp(e.target.value, 'gi');
    const { pokemon } = this.state;
    const filtered = pokemon.filter(el => el.name.match(regex));
    this.setState({ filteredPokemon: filtered });
  }

  render() { 
    const { 
      pokemon,
      filteredPokemon,
      fetchingError,
      searchText,
      isLoading,
    } = this.state;

    if (isLoading) {
      return (<Spinner />);
    }

    if (fetchingError) {
      return (
        <Alert msg="Something went wrong" />
      );
    }

    return (
      <main className="main-content">
        <div className="pokemon-search__wrapper">
          <div className="pokemon-searchbar__wrapper">
            <i className="fas fa-search" />
            <input 
              type="text"
              className="pokemon-search__input"
              placeholder="Pokemon Search"
              onChange={this.handleSearch} 
              value={searchText}
            />
          </div>
        </div>
        <section className="pokemon-section">
          <PokemonCard pokemonList={filteredPokemon.length > 0 ? filteredPokemon : pokemon} />
        </section>
      </main>    
    );
  }
}

export default PokemonList;
