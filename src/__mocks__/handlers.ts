import { http, HttpResponse } from 'msw';
import topRatedShows from './fixtures/top-rated-shows.json';
import topRatedMovies from './fixtures/top-rated-movies.json';
import spiderTvResults from './fixtures/spider-tv-results.json';
import spiderMovieResults from './fixtures/spider-movie-results.json';
import avengersMovieResults from './fixtures/avengers-movie-results.json';
import avengersPageFourMovieResults from './fixtures/avengers-movie-page-four-results.json';
import aveMovieResults from './fixtures/ave-movie-results.json';
import aveTvResults from './fixtures/ave-tv-results.json';
import noResults from './fixtures/no-results.json';

const handlers = [
  http.get('https://api.themoviedb.org/3/tv/top_rated', () =>
    HttpResponse.json(topRatedShows),
  ),
  http.get('https://api.themoviedb.org/3/movie/top_rated', () =>
    HttpResponse.json(topRatedMovies),
  ),
  http.get('https://api.themoviedb.org/3/search/tv', ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('query');
    const page = url.searchParams.get('page');

    if (query === 'spider' && page === '1') {
      return HttpResponse.json(spiderTvResults);
    }
    if (query === 'ave' && page === '1') {
      return HttpResponse.json(aveTvResults);
    }
    if (query === 'cdda' && page === '1') {
      return HttpResponse.json(noResults);
    }

    return HttpResponse.json(null, { status: 404 });
  }),
  http.get('https://api.themoviedb.org/3/search/movie', ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('query');
    const page = url.searchParams.get('page');

    if (query === 'spider' && page === '1') {
      return HttpResponse.json(spiderMovieResults);
    }
    if (query === 'avengers' && page === '1') {
      return HttpResponse.json(avengersMovieResults);
    }
    if (query === 'avengers' && page === '4') {
      return HttpResponse.json(avengersPageFourMovieResults);
    }
    if (query === 'ave' && page === '1') {
      return HttpResponse.json(aveMovieResults);
    }
    if (query === 'cdda' && page === '1') {
      return HttpResponse.json(noResults);
    }

    return HttpResponse.json(null, { status: 404 });
  }),
];

export default handlers;
