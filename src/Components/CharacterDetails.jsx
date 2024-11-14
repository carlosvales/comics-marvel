import React, { useState, useEffect } from 'react';
import { fetchMarvelData } from '../api';

const CharacterDetails = ({ characterId, onBack }) => {
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [loadingCharacter, setLoadingCharacter] = useState(true);
  const [loadingComics, setLoadingComics] = useState(true);

  // Fetch detalles del personaje
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const data = await fetchMarvelData(`characters/${characterId}`);
        setCharacter(data.data.results[0]);
        setLoadingCharacter(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setLoadingCharacter(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  // Fetch cómics del personaje
  useEffect(() => {
    const fetchCharacterComics = async () => {
      try {
        const data = await fetchMarvelData(`characters/${characterId}/comics`);
        setComics(
          data.data.results.filter(
            (comic) =>
              comic.thumbnail &&
              !comic.thumbnail.path.includes('image_not_available')
          )
        );
        setLoadingComics(false);
      } catch (error) {
        console.error('Error fetching character comics:', error);
        setLoadingComics(false);
      }
    };

    fetchCharacterComics();
  }, [characterId]);

  if (loadingCharacter) return <p>Cargando detalles del personaje...</p>;
  if (!character) return <p>No se encontró el personaje.</p>;

  return (
    <div className="character-details">
      {/* Detalles del personaje */}
      <div className="character-header">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="character-image"
        />
        <div className="character-description">
          <h2>{character.name}</h2>
          <p>{character.description || 'No hay descripción disponible.'}</p>
        </div>
      </div>
      {/* Botón para volver */}
      <button onClick={onBack}>Volver</button>
      {/* Lista de cómics */}
      <h3>Cómics de {character.name}:</h3>
      {loadingComics ? (
        <p>Cargando cómics...</p>
      ) : comics.length === 0 ? (
        <p>No se encontraron cómics para este personaje.</p>
      ) : (
        <div className="container">
          {comics.map((comic) => (
            <div className="card comic" key={comic.id}>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <div className="card-content">
                <h3>{comic.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default CharacterDetails;
