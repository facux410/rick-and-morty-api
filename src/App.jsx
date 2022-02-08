import { useEffect, useState } from "react";
import "./App.css";
import { getAllCharacters } from "./Api/api";

function App() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState("");
  const [characterSelected , setCharacterSelected] = useState({})

  useEffect(() => {
    getAllCharacters().then((data) => setCharacters(data));
  }, []);
  useEffect(() => {
    showUpCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);


  const showUpCharacter = async () => {
    if (characterSelected !== '') {
      
      const api = await fetch(
        `https://rickandmortyapi.com/api/character/${character}`
      );
      const res = await api.json();
     
      setCharacterSelected(res);
    }
  };

  return (
    <div className="container">
      <h1> Rick and Morty App</h1>
    
       <select
          value={character}
          onChange={(e) => setCharacter(e.target.value)}>
          <option value=''>- Select character -</option>
          {characters.map((character) => (
            <option value={character.id} key={character.id}>
              {character.name}
            </option>
          ))}
        </select>
        <div>
        {characterSelected?.name ? (
          <div className='targetContainer'>
           
                <img
                  src={characterSelected.image}
                  alt={characterSelected.name}
                />
                <div className='targetText'>
                  <h3>{characterSelected.name}</h3>
                  <p>
                    species: <b>{characterSelected.species}</b>
                  </p>
                  <p>
                    status: <b>{characterSelected.status}</b>
                  </p>
                </div>
              
          </div>
        ) : (
          <p>Seleccione un personaje</p>
        )}
      </div>
    </div>
    
  );
}

export default App;
