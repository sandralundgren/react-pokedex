import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Pokedex from './Pokedex';
import Navbar from './Navbar';

const Main = () => (
  <React.Fragment>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/pokedex' component={Pokedex} />
    </Switch>
  </React.Fragment>
)

export default Main;
