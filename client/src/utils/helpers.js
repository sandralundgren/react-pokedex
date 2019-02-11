import {
  pokemonIdCharStart,
} from './constants';

export const capitalize = str => (str.charAt(0).toUpperCase() + str.slice(1));

export const getPokemonId = (str) => (str.substring(pokemonIdCharStart, str.length - 1));

export const extractId = (str, charStart) => (str.substring(charStart, str.length - 1));

export const sortByObjKey = (arr, key) => (arr.sort((a,b) => a[key] - b[key]));

export const removeDash = (str) => (str.split('-').join(' '));

export const flattenedArray = (arr) => [].concat(...arr);

export const intersection = (arr1, arr2) => Array.from(arr1.filter(el => arr2.includes(el)));

export const uniqueItems = (arr) => Array.from([...new Set(arr)]);
