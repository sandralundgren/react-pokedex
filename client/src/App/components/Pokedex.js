import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonPage from './PokemonPage';

const Pokedex = () => (
  <Switch>
    <Route exact path='/pokedex' component={PokemonList} />
    <Route path='/pokedex/:pokeId' component={PokemonPage} />
  </Switch>
)

export default Pokedex;
