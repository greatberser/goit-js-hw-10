export function fetchBreeds(){
    return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        if(!response.ok){
            throw new Error('Oops, error...');
        }
        return response.json();
    });
}

export function fetchCatByBreed(breedId){
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to fetch cat information');
        }
        return response.json();
    })
}