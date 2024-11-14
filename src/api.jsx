import md5 from 'md5';

const PUBLIC_KEY = '20414fa443c74aae420a5c8fc377ed23';
const PRIVATE_KEY = 'bd02ba009cdd2205e5cc5e9d29239ae3418418a8';
const BASE_URL = 'https://gateway.marvel.com/v1/public';

export const fetchMarvelData = async (endpoint, params = {}) => {
    const ts = new Date().getTime();
    const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);
    const queryParams = new URLSearchParams({
        ts,
        apikey: PUBLIC_KEY,
        hash,
        ...params,
    });

    const url = `${BASE_URL}/${endpoint}?${queryParams}`;
    console.log('Generated URL:', url);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return await response.json();
};
