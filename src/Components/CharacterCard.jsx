import React from 'react';

const CharacterCard = ({ character }) => {
    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{character.name}</h2>
            <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                style={{ width: '100px', height: '100px' }}
            />
            <p>{character.description || 'No hay descripcion para este personaje.'}</p>
        </div>
    );
};

export default CharacterCard;
