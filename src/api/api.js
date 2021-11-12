import React from 'react';
import axios from 'axios';

const API_KEY = '9a486678298b7343c236968cf85edbc1';
const API_URI = `https://api.themoviedb.org/3`;

export async function discoverMovies() {
    try {
        const response = await axios.get(API_URI + `/discover/movie?api_key=${API_KEY}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}