import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
  return fetch(
    `  https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error('the country is not found');
    }
    return res.json();
  });
}
