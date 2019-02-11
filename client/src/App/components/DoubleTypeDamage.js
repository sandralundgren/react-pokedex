import React from 'react';
import PropTypes from 'prop-types';

import { 
  intersection,
  capitalize,
  sortByObjKey,
} from '../../utils/helpers';

class DoubleTypeDamage extends React.Component {
  state = { 
    doubleTypesRelations: [],
  };

  componentDidMount = () => {
    const { typeData } = this.props;
    this.compareTypes(typeData);
  }

  compareTypes = (typeData) => {
    const firstTypeRelations = typeData[0];
    const secondTypeRelations = typeData[1];
    const doubleDamageFirstType = firstTypeRelations.damage_relations.double_damage_from ? 
      firstTypeRelations.damage_relations.double_damage_from.map(item => ({ name: item.name, type: 'first', damage: 2 })) : [];
    const normalDamageFirstType = firstTypeRelations.damage_relations.normal_damage_from ? 
      firstTypeRelations.damage_relations.normal_damage_from.map(item => ({ name: item.name, type: 'first', damage: 1 })) : [];
    const halfDamageFirstType = firstTypeRelations.damage_relations.half_damage_from ? 
      firstTypeRelations.damage_relations.half_damage_from.map(item => ({ name: item.name, type: 'first', damage: 0.5 })) : [];
  
    const firstTypeCollection = [ ...doubleDamageFirstType, ...normalDamageFirstType, ...halfDamageFirstType ];
  
    const doubleDamageSecondType = secondTypeRelations.damage_relations.double_damage_from ? 
      secondTypeRelations.damage_relations.double_damage_from.map(item => ({ name: item.name, type: 'second', damage: 2 })) : [];
    const normalDamageSecondType = secondTypeRelations.damage_relations.normal_damage_from ? 
      secondTypeRelations.damage_relations.normal_damage_from.map(item => ({ name: item.name, type: 'second', damage: 1 })) : [];
    const halfDamageSecondType = secondTypeRelations.damage_relations.half_damage_from ? 
      secondTypeRelations.damage_relations.half_damage_from.map(item => ({ name: item.name, type: 'second', damage: 0.5 })) : [];
  
    const secondTypeCollection = [ ...doubleDamageSecondType, ...normalDamageSecondType, ...halfDamageSecondType ];

    const relations = [...firstTypeCollection, ...secondTypeCollection];
    
    const secondTypeNames = firstTypeCollection.map(item => item.name);
    const firstTypeNames = secondTypeCollection.map(item => item.name);
  
    const affectedTypes = intersection(firstTypeNames, secondTypeNames);

    const matchingTypes = affectedTypes.map(item => relations.filter(el => el.name === item));

    const newDamage = matchingTypes.map(el => {
      return { name: el[0].name, damage: el.reduce((a, b) => a.damage * b.damage) }
    });
                            
    const relationsMinusNewDamage = relations.filter(item => (!newDamage.some(val => val.name === item.name)));
      
    const recomputedTypes = relationsMinusNewDamage.concat(newDamage);

    sortByObjKey(recomputedTypes, 'damage').reverse();
    
    this.setState({ doubleTypesRelations: recomputedTypes });
  };

  render() { 
    const {
      doubleTypesRelations,
    } = this.state;

    return (
      <div className="pokemon-details__damage-from">
        { 
          doubleTypesRelations.map((item, i) => (
            <span key={`${i}-${item.name}`} className={`pokemon__type type__${item.name}`}>
              {`${item.damage}x damage from ${capitalize(item.name)}`}
            </span>
          ))
        }
      </div>

    );
  }
}

export default DoubleTypeDamage;

DoubleTypeDamage.propTypes = {
  typeData: PropTypes.arrayOf(PropTypes.shape({
    damage_relations: PropTypes.shape({}).isRequired,
  })).isRequired,
};
