const url = 'https://api.thecatapi.com/v1';
const apiKey = "live_rViMZxOEC0DEWK9wByBIBCFBmjInraXvv5eNlHycWAkcHOPcjmhcNaI0aFVHjf2K";

export function fetchBreeds(){
    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Oops, error...');
        }
        return response.json();
    });
}

export function fetchCatByBreed(breedId){
    const apiKey = "live_bgrepK98pfyDEX3j7ghYG8MDyfYms2XcDU96QItIHIdQBAZU65VP32rnk7PVNFur";
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}`)
    .then(response => response.json()
    );
}