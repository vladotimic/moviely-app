import { http, HttpResponse } from 'msw';
import topRatedShows from './fixtures/top-rated-shows.json';
import topRatedMovies from './fixtures/top-rated-movies.json';

const handlers = [
  http.get('https://api.themoviedb.org/3/tv/top_rated', () =>
    HttpResponse.json(topRatedShows),
  ),
  http.get('https://api.themoviedb.org/3/movie/top_rated', () =>
    HttpResponse.json(topRatedMovies),
  ),
];

export default handlers;
