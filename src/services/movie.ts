import api from '@/lib/api';
import { ActiveTab, IGenres, IMovieDetails } from '@/types';

type MovieResults = {
  title: string;
  release_date: string;
};

type ShowResults = {
  name: string;
  first_air_date: string;
};

type TopRatedResults = {
  id: number;
  poster_path: string;
} & MovieResults &
  ShowResults;

type VideoResults = {
  key: string;
  type: string;
};

type DetailsResult = {
  overview: string;
  imdb_id: string;
  genres: IGenres[];
  status: string;
  runtime: number;
  last_air_date: string;
  backdrop_path: string;
  videos: {
    results: VideoResults[];
  };
} & TopRatedResults;

interface ITopRatedResults {
  page: number;
  total_pages: number;
  results: TopRatedResults[];
}

export async function getTopRated(activeTab: ActiveTab) {
  const response = await api.get<ITopRatedResults>(`/${activeTab}/top_rated`);
  const data = response.data.results;
  return data.map((item: TopRatedResults) => {
    const { id, poster_path: poster } = item;

    const title = item.title ? item.title : item.name;
    const date = item.release_date ? item.release_date : item.first_air_date;

    return {
      id,
      title,
      date,
      poster,
    };
  });
}

export async function getBySearchQuery(
  activeTab: ActiveTab,
  query: string,
  page: number,
) {
  const response = await api.get<ITopRatedResults>(`/search/${activeTab}`, {
    params: {
      query,
      page,
    },
  });

  const { page: currentPage, results, total_pages: pageSize } = response.data;

  const data = results.map((item: TopRatedResults) => {
    const { id, poster_path: poster } = item;

    const title = item.title ? item.title : item.name;
    const date = item.release_date ? item.release_date : item.first_air_date;

    return {
      id,
      title,
      date,
      poster,
    };
  });
  return {
    data,
    currentPage,
    pageSize,
  };
}

export async function getById(id: string, activeTab: ActiveTab) {
  const { data } = await api.get<DetailsResult>(
    `/${activeTab}/${id}?append_to_response=videos`,
  );

  const {
    poster_path: poster,
    status,
    genres,
    overview,
    runtime,
    videos,
    imdb_id: imdb,
    backdrop_path: cover,
  } = data;

  const result: IMovieDetails = {
    id: data.id,
    title: data.title ? data.title : data.name,
    date: data.release_date ? data.release_date : data.first_air_date,
    poster,
    overview,
    cover,
    status,
    genres,
  };

  if (videos.results.length > 0) {
    const trailer = videos.results.find((video) => video.type === 'Trailer');
    result.trailer = trailer?.key;
  }
  if (imdb) {
    result.imdb = imdb;
  }
  if (runtime) {
    result.runtime = runtime;
  }

  return result;
}
