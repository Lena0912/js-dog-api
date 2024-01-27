import { fetchBreeds, fetchCatByBreed } from './cat-api'
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

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
            elements.breedSelect.insertHTML = optionsMarkup.join('');

            new SlimSelect({
                select: elements.breedSelect,
            });
        })
        .catch(onError);
        }


updateSelect(); 

function createMarkup(evt) {
    
    const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            elements.loader.classList.replace('loader', 'is-hidden');
            elements.catInfo.innerHTML = '';

            const { url, breeds } = data[0];

            const markup =
                `<img src="${url}" alt="${breeds[0].name}" width='400'/>
      <div class="box">
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p>Temperament: ${breeds[0].temperament}</p>
      </div>`;
                
            elements.catInfo.innerHTML = markup;
            elements.catInfo.classList.remove('is-hidden');
        })
        .catch(onError);
}
function onError(err) {
    console.error(err);
   }
elements.breedSelect.addEventListener('change', createMarkup);

