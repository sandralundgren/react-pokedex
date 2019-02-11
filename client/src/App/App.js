import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Main from './components/Main';

class App extends React.Component {
  render() {
    const App = () => (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/pokedex' component={Main}/>
      </Switch>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
