import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { 
  getPokemonId,
  removeDash,
} from '../../utils/helpers';
import { imageSpriteBaseUrl } from '../../base/api';

const PokemonCard = (props) => {
  const {
    pokemonList,
  } = props;

  return (
    <React.Fragment>
      {
        pokemonList.map((item, i) => {
          const pokeId = getPokemonId(item.url);
          return (
            <Link 
              to={`/pokedex/${pokeId}`} 
              key={`${i}-${pokeId}`} 
              className="pokemon-card__link"
            >
              <div 
                className="pokemon-card"
                data-pokeid={pokeId}
              >
                <img 
                  src={`${imageSpriteBaseUrl}${pokeId}.png`}
                  alt={`Front view pokemon ${item.name}`}
                  className="pokemon-card__image"
                />
                <div className="pokemon-card__name-wrapper">
                  <span className="pokemon-card__id">
                    {`#${pokeId} `}
                  </span>
                  <span className="pokemon-card__name">
                    { removeDash(item.name) }
                  </span>
                </div>
              </div>
            </Link>
          );
        })
      }
    </React.Fragment>
  );
}

export default PokemonCard;

PokemonCard.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};
