import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 1000;
const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.addEventListener(
  'input',
  debounce(() => {
    name = inputField.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    fetchCountries(name)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        if (data.length >= 2 && data.length <= 10) {
          data.map(data => {
            markup = `<li class="country-list"><img src="${data.flags.png}" alt="" width=150>
      <p>${data.name.official}</p></li>`;
            countryList.insertAdjacentHTML('beforeend', markup);
          });
        } else {
          data.map(data => {
            const { flags, name, capital, population, languages } = data;
            markup = ` <img src="${flags.png}" alt="" width=300>
      <h2>${name.official}</h2>
      <span class="name">Capital:</span>
      <span class="text">${capital}</span> <br /><span class="name">Population:</span>
      <span class="text">${population}</span> <br /><span class="name"> Languages: </span
      ><span class="text">${Object.values(languages)}</span>`;
            countryInfo.innerHTML = markup;
          });
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }),
  DEBOUNCE_DELAY
);
