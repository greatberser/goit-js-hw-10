/*
    HTTP-запити
    Використовуй публічний The Cat API. Для початку роботи необхідно 
    зареєструватися й отримати унікальний ключ доступу, щоб прикріплювати 
    його до кожного запиту. Заходимо на головну сторінку та натискаємо нижче 
    кнопку Signup for free, дотримуємося інструкції, ключ буде надіслано на вказану пошту.

    Для використання ключа необхідно використовувати HTTP-заголовок x-api-key. 
    Рекомендується використовувати axios та додати заголовок до всіх запитів.

    import axios from "axios";

    axios.defaults.headers.common["x-api-key"] = "твій ключ";


    Колекція порід
    Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід. 
    Для цього необхідно виконати GET-запит на ресурс https://api.thecatapi.com/v1/breeds, 
    що повертає масив об'єктів. У разі успішного запиту, необхідно наповнити select.breed-select 
    опціями так, щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.

    Напиши функцію fetchBreeds(), яка виконує HTTP-запит і повертає 
    проміс із масивом порід - результатом запиту. Винеси її у файл cat-api.js 
    та зроби іменований експорт.

    Інформація про кота
    Коли користувач обирає якусь опцію в селекті, необхідно виконувати запит 
    за повною інформацією про кота на ресурс https://api.thecatapi.com/v1/images/search. 
    Не забудь вказати в цьому запиті параметр рядка запиту breed_ids з ідентифікатором породи.

    Ось як буде виглядати URL-запит для отримання повної інформації про собаку за ідентифікатором породи:

    https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи

    Напиши функцію fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить 
    HTTP-запит і повертає проміс із даними про кота - результатом запиту. Винеси її у 
    файл cat-api.js і зроби іменований експорт.

    Якщо запит був успішний, під селектом у блоці div.cat-info з'являється зображення і 
    розгорнута інформація про кота: назва породи, опис і темперамент.

*/

import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_bgrepK98pfyDEX3j7ghYG8MDyfYms2XcDU96QItIHIdQBAZU65VP32rnk7PVNFur";

const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function hideLoaderForBreeds() {
    loader.classList.add('hidden');
    breedSelect.classList.remove('hidden');
    error.classList.add('hidden');
}

function showLoaderForCatInfo() {
    loader.classList.remove('hidden');
    infoCat.classList.add('hidden');
    error.classList.add('hidden');
}
  
function hideLoaderForCatInfo() {
    loader.classList.add('hidden');
    infoCat.classList.remove('hidden');
    error.classList.add('hidden');
}

function showError() {
    error.classList.remove('hidden');
    loader.classList.add('hidden');
    breedSelect.classList.add('hidden');
    infoCat.classList.add('hidden');
}

fetchBreeds()
.then(breeds => {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
    hideLoaderForBreeds();
})
.catch(error => {
    console.error(error);
    showError();
});


breedSelect.addEventListener('change', () => {
    const selectedBreedID = breedSelect.value;

    if (selectedBreedID) {
        showLoaderForCatInfo();
        fetchCatByBreed(selectedBreedID)
            .then(response => {
                if (response.length > 0) {
                    const cat = response[0];
                        infoCat.innerHTML = `
                            <h2>${cat.name}</h2>
                            <p>${cat.description}</p>
                            <p><strong>Temperament:</strong> ${cat.temperament}</p>
                            <img src="${cat.url}" alt="${cat.name}">`;
                            loader.classList.add('hidden');
                            error.classList.add('hidden');
                } else {
                    showError();
                }
            })
            .catch(error => {
                console.error(error);
                showError();
            });
    }
});