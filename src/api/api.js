import React from 'react';
import axios from 'axios';

const API_KEY = '9a486678298b7343c236968cf85edbc1';
const API_URI = `https://api.themoviedb.org/3`;

export async function discoverMovies({ host, filter, services, genres }) {
    try {
        const service_ids = Object.keys(services).filter(e => services[e].selected);
        const genre_ids = Object.keys(genres).filter(e => genres[e].selected);
        const certifications = Array.from(filter.ageRestrict);
        const dateRange = filter.dateRange;
        const ratingRange = filter.ratingRange;
        
        let params = service_ids.length > 0 ? `&with_watch_providers=${service_ids.join('|')}` : ``;
        params += genre_ids.length > 0 ? `&with_genres=${genre_ids.join('|')}` : ``;
        params += certifications.length > 0 ? `&certification_country=US&certification=${certifications.join('|')}` : ``;
        params += `&vote_average.gte=${ratingRange[0]}&vote_average.lte=${ratingRange[1]}`;
        params += `&release_date.gte=${dateRange[0]}-01-01&release_date.lte=${dateRange[1]}-12-31`;
        console.log(params);
        const response = await axios.get(API_URI + `/discover/movie?api_key=${API_KEY}${params}`);
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