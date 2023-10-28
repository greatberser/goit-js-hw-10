import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_rViMZxOEC0DEWK9wByBIBCFBmjInraXvv5eNlHycWAkcHOPcjmhcNaI0aFVHjf2K";

const refs = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = refs;

loader.classList.replace('loader', 'hidden');
error.classList.add('hidden');
divCatInfo.classList.add('hidden');
selector.classList.replace('breed-select', 'hidden');

fetchBreeds()
  .then(data => {
    const markup = data.map(({id,name}) => `<option value="${id}">${name}</option>`)
   .join();
    selector.innerHTML = markup;
    
    selector.classList.replace('hidden', 'breed-select');
})
  .catch(onFetchError);    

selector.addEventListener('change', onSelectBreed);
    
function onSelectBreed(event) {
  loader.innerHTML = '';
  selector.classList.add('hidden');
  divCatInfo.classList.add('hidden');
  loader.classList.replace('hidden', 'loader');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
  .then(data => {
  loader.classList.replace('loader', 'hidden');
  selector.classList.remove('hidden');
  const { url, breeds } = data[0];
        
  divCatInfo.innerHTML = `
    <div class="description">
    <h1>${breeds[0].name}</h1>
    <p>${breeds[0].description}</p>
    <p><b>Temperament:</b> ${breeds[0].temperament}</p>
    </div>
    <img src="${url}" alt="${breeds[0].name}" width="400"/>`
    divCatInfo.classList.remove('hidden');
    })
  .catch(onFetchError);
};

function onFetchError() {
  selector.classList.remove('hidden');
  loader.classList.replace('loader', 'hidden');
};