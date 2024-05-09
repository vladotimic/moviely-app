import { http, HttpResponse } from 'msw';
import topRatedShows from './fixtures/top-rated-shows.json';
import topRatedMovies from './fixtures/top-rated-movies.json';
import spiderTvResults from './fixtures/spider-tv-results.json';
import spiderMovieResults from './fixtures/spider-movie-results.json';
import avengersMovieResults from './fixtures/avengers-movie-results.json';
import avengersPageFourMovieResults from './fixtures/avengers-movie-page-four-results.json';
import aveMovieResults from './fixtures/ave-movie-results.json';
import aveTvResults from './fixtures/ave-tv-results.json';
import breakingBad from './fixtures/breaking-bad-show.json';
import theGodfather from './fixtures/the-godfather-movie.json';
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

    const queryParams: {
      [key: string]: object;
    } = {
      spider: spiderTvResults,
      ave: aveTvResults,
      cdda: noResults,
    };

    if (query && query in queryParams && page === '1') {
      return HttpResponse.json(queryParams[query]);
    }

    return HttpResponse.json(null, { status: 404 });
  }),
  http.get('https://api.themoviedb.org/3/search/movie', ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('query');
    const page = url.searchParams.get('page');

    const queryParams: {
      [key: string]: {
        [key: string]: object;
      };
    } = {
      spider: { 1: spiderMovieResults },
      avengers: {
        1: avengersMovieResults,
        4: avengersPageFourMovieResults,
      },
      ave: { 1: aveMovieResults },
      cdda: { 1: noResults },
    };

    if (
      query &&
      page &&
      query in queryParams &&
      (+page) in queryParams[query]
    ) {
      return HttpResponse.json(queryParams[query][page]);
    }

    return HttpResponse.json(null, { status: 404 });
  }),
  http.get('https://api.themoviedb.org/3/tv/:id', ({ request, params }) => {
    const url = new URL(request.url);

    const { id } = params;
    const append = url.searchParams.get('append_to_response');

    const ids: {
      [key: string]: object;
    } = {
      1396: breakingBad,
      238: theGodfather,
    };

    if (id && (+id) in ids && append === 'videos') {
      return HttpResponse.json(ids[+id]);
    }

    return HttpResponse.json(null, { status: 404 });
  }),
];

export default handlers;
