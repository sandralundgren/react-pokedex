/* eslint-disable react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';

import { 
  capitalize,
  sortByObjKey,
  removeDash,
} from '../../utils/helpers';
import { 
  gameVersion,
  targetLanguage,
} from '../../utils/constants';
import { imageSpriteBaseUrl } from '../../base/api';
import Spinner from './Spinner';
import Alert from './Alert';
import TypeDamage from './TypeDamage';
import DoubleTypeDamage from './DoubleTypeDamage';

class PokemonPage extends React.Component {
  state = {
    pokemonData: [],
    typeData: [],
    speciesData: {},
    fetchingError: false,
    isLoading: true,
  };

  fetchTypes = (data) => {
    data.map(el => { 
      const typeUrl = el.type.url;
      return fetch(typeUrl)
        .then(res => res.json())
        .then(data => (this.setState(prevState => ({ typeData: [...prevState.typeData, data] }))))
        .catch(() => { 
          this.setState({ 
            fetchingError: true,
            isLoading: false,
          });
        });
    });
  }

  fetchSpecies = (id) => {
    this.setState({ 
      isLoading: true,
    });
    fetch(`/api/pokemon-species/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          speciesData: data,
          isLoading: false,
        });
      })
      .catch(() => { 
        this.setState({ 
          fetchingError: true,
          isLoading: false,
        });
      });
  }

  componentDidMount = () => {
    const { pokeId } = this.props.match.params;

    fetch(`/api/pokemon/${pokeId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          pokemonData: data,
          isLoading: false,
        });
      })
      .then(() => this.fetchTypes(this.state.pokemonData.types))
      .then(() => this.fetchSpecies(this.state.pokemonData.id))
      .catch(() => { 
        this.setState({ 
          fetchingError: true,
          isLoading: false,
        });
      });
  }

  render() {
    const { 
      pokemonData,
      isLoading,
      typeData,
      speciesData,
      fetchingError,
    } = this.state;

    const {
      abilities,
      name, 
      types,
      id,
      stats,
    } = pokemonData;

    let description =  [];
    if (speciesData.flavor_text_entries) {
      description = speciesData.flavor_text_entries.filter(el => {
        return (el.language.name === targetLanguage && el.version.name === gameVersion)
      });
    }

    if (isLoading) {
      return (<Spinner />);
    }

    if (fetchingError) {
      return (
        <Alert msg="Something went wrong" />
      );
    }

    return (
      <React.Fragment>
        { 
          <div className="pokemon-details__parent-wrapper">
            <div className="pokemon-sprites__parent-wrapper">
              <div className="pokemon-sprites-wrapper pokemon-sprites--normal-wrapper">
                <img 
                  src={`${imageSpriteBaseUrl}${id}.png`}
                  alt={`Front view pokemon ${name}`}
                  className="pokemon-details__image"
                />
                <span className="pokemon__type pokemon__shininess pokemon--normal">
                  Normal
                </span>
              </div>
              <div className="pokemon-sprites-wrapper pokemon-sprites--shiny-wrapper">
                <img 
                  src={`${imageSpriteBaseUrl}shiny/${id}.png`}
                  alt={`Front view pokemon ${name} shiny`}
                  className="pokemon-details__image"
                />
                <span className="pokemon__type pokemon__shininess pokemon--shiny">
                  Shiny
                </span>
              </div>
            </div>
            <h1 className="pokemon-details__name">
              { `#${id} ${removeDash(name)}` }
            </h1>
            <div className="pokemon-details__types">
              { 
                sortByObjKey(types, 'slot').map((el, i) => (
                  <span key={`${i}-${el.type.name}`} className={`pokemon__type type__${el.type.name}`}>
                    { capitalize(el.type.name) }
                  </span>))
              }
            </div>
            <div className="pokemon-details__species">
              { 
                description.map(el => <div className="pokemon-details__description" key={`i-${el.version.name}`}>{ el.flavor_text }</div>) 
              }
            </div>
            <div className="pokemon-details__abilities">
              <span className="pokemon-details__ability pokemon-details__label">Abilities:</span>
              { 
                abilities.map((el, i) => (
                  <span key={`${i}-${el.ability.name}`} className="pokemon-details__ability">
                    { i > 0 && ', '}
                    { capitalize(el.ability.name) }
                  </span>
                )) 
              }
            </div>
            <div className="pokemon-details__stats">
              <span className="pokemon-details__label">Stats:</span>
              { 
                stats.reverse().map((el, i) => (
                  <div key={`${i}-${el.stat.name}-stats`} className="pokemon-details__stat-wrapper">
                    <span className="pokemon-details__stat pokemon-details__stat-name">
                      { removeDash(el.stat.name) }
                    </span>
                    <span className="pokemon-details__stat pokemon-details__stat-value">
                      { el.base_stat }
                    </span>
                  </div>
                )) 
              }
            </div>
            { 
              typeData.length > 1 ? 
                <DoubleTypeDamage typeData={typeData} /> : 
                <TypeDamage typeData={typeData} />
            }
          </div>
        }
      </React.Fragment>
    );
  }
}

export default PokemonPage;

PokemonPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pokeId: PropTypes.string,
    }),
  }).isRequired,
};
