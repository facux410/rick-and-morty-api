const urlApi = "https://rickandmortyapi.com/api/character";

export const getAllCharacters = () =>
  fetch(urlApi)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => console.log(error));