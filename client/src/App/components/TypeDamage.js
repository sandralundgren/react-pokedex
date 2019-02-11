import React from 'react';
import PropTypes from 'prop-types';

import { 
  capitalize,
} from '../../utils/helpers';

const TypeDamage = (props) => {
  const { 
    typeData,
  } = props;

  return (
    <div className="pokemon-details__damage-from">
      { 
        typeData.map((el, i) => (
          (el.damage_relations.double_damage_from && el.damage_relations.double_damage_from.length > 0) &&
          (
            <div key={`${i}-${el.id}`} className="pokemon-details__damage">
              { 
                el.damage_relations.double_damage_from.map((type, i) => 
                  (
                    <span key={`${i}-${type.url}-double-damage`} className={`pokemon__type type__${type.name}`}>
                      { `2x damage from ${capitalize(type.name)}`}
                    </span>
                  )) 
              }
            </div>
          )
        )) 
      }

      { 
        typeData.map((el, i) => (
          (el.damage_relations.normal_damage_from && el.damage_relations.normal_damage_from.length > 0) &&
          (
            <div key={`${i}-${el.id}`} className="pokemon-details__damage">
              { 
                el.damage_relations.normal_damage_from.map((type, i) => 
                  (
                    <span key={`${i}-${type.url}-normal-damage`} className={`pokemon__type type__${type.name}`}>
                      { `1x damage from ${capitalize(type.name)}`}
                    </span>
                  )) 
              }
            </div>
          )
        )) 
      }

      { 
        typeData.map((el, i) => (
          (el.damage_relations.half_damage_from && el.damage_relations.half_damage_from.length > 0) &&
          (
            <div key={`${i}-${el.id}`} className="pokemon-details__damage">
              { 
                el.damage_relations.half_damage_from.map((type, i) => 
                  (
                    <span key={`${i}-${type.url}-half-damage`} className={`pokemon__type type__${type.name}`}>
                      { `0.5x damage from ${capitalize(type.name)}`}
                    </span>
                  )) 
              }
            </div>
          )
        )) 
      }
    </div>
  );
}

export default TypeDamage;

TypeDamage.propTypes = {
  typeData: PropTypes.arrayOf(PropTypes.shape({
    damage_relations: PropTypes.shape({}).isRequired,
  })).isRequired,
};
