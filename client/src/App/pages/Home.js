import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <h1>Home</h1>
      <Link to="./pokedex">
        <button type="button" variant="raised">
          Go to Pokedex
        </button>
      </Link>
    </div>
  );
}

export default Home;
