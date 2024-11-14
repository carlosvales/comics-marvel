import React from 'react';

const CharacterList = ({ characters, toggleFavorite, favoriteCharacters, onSelectCharacter }) => {
  if (!characters || characters.length === 0) {
    return <p>No se encontraron personajes.</p>;
  }

  return (
    <div className="container">
      {characters.map((character) => (
        <div
          className="card"
          key={character.id}
          onClick={() => onSelectCharacter(character.id)} // Cambia al personaje seleccionado
        >
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="card-content">
            <h2>{character.name}</h2>
            <button
              className={`star-button ${favoriteCharacters.some((fav) => fav.id === character.id) ? 'selected' : ''
                }`}
              onClick={(e) => {
                e.stopPropagation(); // Evita abrir los detalles al hacer clic en la estrella
                toggleFavorite(character);
              }}
            >
              ★
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
