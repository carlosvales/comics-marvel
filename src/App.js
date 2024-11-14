import './App.css';
import React, { useState, useEffect } from 'react';
import CharacterList from './Components/CharacterList';
import CharacterDetails from './Components/CharacterDetails';
import ComicDetails from './Components/ComicDetails';
import CharacterComics from './Components/CharacterComics';
import { fetchMarvelData } from './api';

function App() {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [currentSection, setCurrentSection] = useState('paginaPrincipal');
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [selectedComicId, setSelectedComicId] = useState(null);

  const toggleFavoriteCharacter = (character) => {
    setFavoriteCharacters((prev) =>
      prev.some((fav) => fav.id === character.id)
        ? prev.filter((fav) => fav.id !== character.id)
        : [...prev, character]
    );
  };

  const toggleFavoriteComic = (comic) => {
    setFavoriteComics((prev) =>
      prev.some((fav) => fav.id === comic.id)
        ? prev.filter((fav) => fav.id !== comic.id)
        : [...prev, comic]
    );
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await fetchMarvelData('characters', { limit: 100 });
        const sortedCharacters = data.data.results.sort((a, b) => {
          const aHasImage = !a.thumbnail.path.includes('image_not_available');
          const bHasImage = !b.thumbnail.path.includes('image_not_available');
          return bHasImage - aHasImage;
        });
        setCharacters(sortedCharacters);
      } catch (error) {
        console.error('Error al obtener personajes:', error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await fetchMarvelData('comics', { limit: 100 });
        const sortedComics = data.data.results.sort((a, b) => {
          const aHasImage = !a.thumbnail.path.includes('image_not_available');
          const bHasImage = !b.thumbnail.path.includes('image_not_available');
          return bHasImage - aHasImage;
        });
        setComics(sortedComics);
      } catch (error) {
        console.error('Error al obtener cómics:', error);
      }
    };

    fetchComics();
  }, []);

  // Manejar el cambio de sección
  const changeSection = (section) => {
    setCurrentSection(section); // Cambia la sección
    setSelectedCharacterId(null); // Resetea la selección de personaje
    setSelectedComicId(null); // Resetea la selección de cómic
  };

  const renderSection = () => {
    if (selectedCharacterId) {
      return (
        <div>
          <p>Estás viendo los detalles del personaje seleccionado. Aquí puedes ver la descripción y los cómics asociados. Usa el botón de "Volver" para regresar.</p>
          <CharacterDetails
            characterId={selectedCharacterId}
            onBack={() => setSelectedCharacterId(null)}
          />
        </div>
      );
    }

    if (selectedComicId) {
      return (
        <div>
          <p>Estás viendo los detalles del cómic seleccionado. Aquí puedes ver su descripción y otros datos relevantes. Usa el botón de "Volver" para regresar.</p>
          <ComicDetails
            comicId={selectedComicId}
            onBack={() => setSelectedComicId(null)}
          />
        </div>
      );
    }

    switch (currentSection) {
      case 'paginaPrincipal':
        return (
          <div>
            <p>Haz clic en "Marvel Explorer" en la parte superior para visitar la documentación de la API de Marvel.</p>
            <p>La idea de esta sección es añadir alguna imagen en este espacio o una descripción del universo Marvel pero no lo considero práctico.</p>
            <p>Aquí puedes seleccionar personajes para ver sus cómics relacionados o marcarlos como favoritos usando el ícono de estrella.</p>
            <CharacterList
              characters={characters}
              toggleFavorite={toggleFavoriteCharacter}
              favoriteCharacters={favoriteCharacters}
              onSelectCharacter={setSelectedCharacterId}
            />
          </div>
        );
      case 'personajes':
        return (
          <div>
            <p>En la sección Personajes, puedes explorar todos los personajes disponibles. Haz clic en un personaje para ver sus detalles y sus cómics.</p>
            <CharacterList
              characters={characters}
              toggleFavorite={toggleFavoriteCharacter}
              favoriteCharacters={favoriteCharacters}
              onSelectCharacter={setSelectedCharacterId}
            />
          </div>
        );
      case 'comics':
        return (
          <div>
            <p>En la sección Cómics, puedes explorar todos los cómics disponibles. Haz clic en un cómic para ver más información o márcalo como favorito.</p>
            <CharacterComics
              comics={comics}
              toggleFavorite={toggleFavoriteComic}
              favoriteComics={favoriteComics}
              onSelectComic={setSelectedComicId}
            />
          </div>
        );
      case 'favoritos':
        return (
          <div>
            <p>En la sección Favoritos, puedes ver los personajes y cómics que has marcado como favoritos.</p>
            <div className="favorites">
              <h2>Favoritos</h2>
              <h3>Personajes:</h3>
              <ul className="favorites-list">
                {favoriteCharacters.map((character) => (
                  <li key={character.id}>
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                      className="favorite-thumbnail"
                    />
                    {character.name}
                  </li>
                ))}
              </ul>
              <h3>Cómics:</h3>
              <ul className="favorites-list">
                {favoriteComics.map((comic) => (
                  <li key={comic.id}>
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      className="favorite-thumbnail"
                    />
                    {comic.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return <h2>Sección no encontrada</h2>;
    }
  };


  return (
    <div className="App">
      <nav className="navbar">
        <a
          href="https://developer.marvel.com/documentation/getting_started"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-logo"
        >
          Marvel Explorer
        </a>
        <ul className="navbar-links">
          <li
            onClick={() => changeSection('paginaPrincipal')}
            className={currentSection === 'paginaPrincipal' ? 'active' : ''}
          >
            Página Principal
          </li>
          <li
            onClick={() => changeSection('personajes')}
            className={currentSection === 'personajes' ? 'active' : ''}
          >
            Personajes
          </li>
          <li
            onClick={() => changeSection('comics')}
            className={currentSection === 'comics' ? 'active' : ''}
          >
            Cómics
          </li>
          <li
            onClick={() => changeSection('favoritos')}
            className={currentSection === 'favoritos' ? 'active' : ''}
          >
            Favoritos
          </li>
        </ul>
      </nav>
      {renderSection()}
    </div>
  );
}

export default App;
