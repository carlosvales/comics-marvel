const CharacterComics = ({ comics, toggleFavorite, favoriteComics, onSelectComic }) => {
  if (!comics || comics.length === 0) {
    return <p>No se encontraron cómics.</p>;
  }

  return (
    <div className="container">
      {comics.map((comic) => (
        <div
          className="card comic"
          key={comic.id}
          onClick={() => onSelectComic(comic.id)} // Selecciona el cómic
        >
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <div className="card-content">
            <h3>{comic.title}</h3>
            <button
              className={`star-button ${favoriteComics.some((fav) => fav.id === comic.id) ? 'selected' : ''
                }`}
              onClick={(e) => {
                e.stopPropagation(); // Evita abrir los detalles al hacer clic en la estrella
                toggleFavorite(comic);
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
export default CharacterComics;
