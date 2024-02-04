import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_W98260Uh6BnYfHxVL49pyAEjPqHNaRJoS7H3lp9VHbD2kKIfswThqYHZurjRek0D';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

elements.catInfo.classList.add('is-hidden');
elements.breedSelect.addEventListener('change', createMarkup);

function updateSelect() {
  fetchBreeds()
    .then(data => {
      elements.loader.classList.replace('loader', 'is-hidden');
      let optionsMarkup = data.map(({ name, id }) => {
        return `<option value= '${id}'>${name}</option>`;
      });
      elements.breedSelect.insertAdjacentHTML(
        'beforeend',
        optionsMarkup.join('')
      );
      new SlimSelect({
        select: elements.breedSelect,
      });
    })
    .catch(error => {
      onError(error);
    });
}

updateSelect();

function createMarkup(evt) {
  elements.loader.classList.replace('is-hidden', 'loader');
  elements.breedSelect.classList.add('is-hidden');
  elements.catInfo.classList.add('is-hidden');

  const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId)
      
        .then(data => {
        console.log('Data received:', data);
      elements.loader.classList.replace('loader', 'is-hidden');
      elements.breedSelect.classList.add('is-hidden');

      if (data && data.length > 0) {
        const { url, breeds } = data[0];

        elements.catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width='400'/>
      <div class="box">
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p>Temperament: ${breeds[0].temperament}</p>
      </div>`;

        elements.catInfo.classList.remove('is-hidden');
      } else {
        Notify.failure('No data available for the selected cat breed.');
      }
    })
    .catch(error => {
      onError(error);
    });
}
function onError(err) {
  elements.breedSelect.classList.remove('is-hidden');
  elements.loader.classList.replace('loader', 'is-hidden');
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
  console.error(err);
}
