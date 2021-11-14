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

export async function getGenres(genres) {
    try {
        const data = (await axios.get(API_URI + `/genre/movie/list?api_key=${API_KEY}`)).data.genres;
        return data.filter((e) => (genres.indexOf(e.id) > -1)).map((e, i) => e.name);
    } catch (e) {
        console.error(e);
    }
}

export async function getMovieDetails(movie_id) {
    try {
        const data = (await axios.get(API_URI + `/movie/${movie_id}?api_key=${API_KEY}&append_to_response=credits,release_dates`)).data;
        let certification = data.release_dates.results.filter(e => e.iso_3166_1 === "US");
        //console.log(certification);
        if (certification.length > 0) {
            certification = certification[0].release_dates;
            certification = certification[certification.length - 1].certification;
        } else {
            certification = "";
        }
        return {
            genres: data.genres.map(e => e.name),
            runtime: data.runtime,
            director: data.credits.crew.filter(e => e.job === "Director").map(e => e.name),
            stars: data.credits.cast.slice(0, 3).map(e => e.name),
            certification,
        }
    } catch (e) {
        console.error(e);
    }
}