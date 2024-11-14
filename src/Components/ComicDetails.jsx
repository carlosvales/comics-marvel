import React, { useState, useEffect } from 'react';
import { fetchMarvelData } from '../api';

const ComicDetails = ({ comicId, onBack }) => {
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch detalles del cómic
  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const data = await fetchMarvelData(`comics/${comicId}`);
        setComic(data.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comic details:', error);
        setLoading(false);
      }
    };

    fetchComicDetails();
  }, [comicId]);

  if (loading) return <p>Cargando detalles del cómic...</p>;
  if (!comic) return <p>No se encontró el cómic.</p>;

  return (
    <div className="comic-details">
      {/* Detalles del cómic */}
      <div className="comic-header">
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="comic-image"
        />
        <div className="comic-description">
          <h2>{comic.title}</h2>
          <p><strong>Descripción:</strong> {comic.description || 'No hay descripción disponible.'}</p>
          <p><strong>Fecha de publicación:</strong> {comic.dates.find(date => date.type === 'onsaleDate')?.date || 'Desconocida'}</p>
          <p><strong>Páginas:</strong> {comic.pageCount || 'Desconocido'}</p>
          <p><strong>Precio:</strong> ${comic.prices.find(price => price.type === 'printPrice')?.price || 'No disponible'}</p>
        </div>
      </div>

      {/* Botón para volver */}
      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default ComicDetails;
