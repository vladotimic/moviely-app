export interface IMovie {
  id: number;
  title: string;
  date: string;
  poster: string;
}

export interface IGenres {
  id: number;
  name: string;
}

export interface IMovieDetails extends IMovie {
  overview: string;
  imdb?: string;
  genres: IGenres[];
  runtime?: number;
  status: string;
  cover: string;
  trailer?: string;
}

export type ActiveTab = 'tv' | 'movie';

export interface IPagination {
  currentPage: number;
  pageSize?: number;
}

export interface ILocationState extends IPagination {
  data: IMovie[];
  activeTab: ActiveTab;
  searchTerm: string;
}

export interface IQueryResults extends IPagination {
  data: IMovie[];
}

export interface IState extends IPagination {
  data: [] | IMovie[];
  details: IMovieDetails | undefined;
  activeTab: ActiveTab;
  searchTerm: string;
  isQuery: boolean;
  loading: boolean;
  error: boolean;
}

export enum ActionType {
  GET_TOP_RATED_BEGIN,
  GET_TOP_RATED_SUCCESS,
  GET_TOP_RATED_ERROR,
  QUERY_DATA_BEGIN,
  QUERY_DATA_SUCCESS,
  QUERY_DATA_ERROR,
  GET_DETAILS_BEGIN,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_ERROR,
  SET_TAB,
  SET_SEARCH_TERM,
  RESET_DETAILS,
  SET_PAGE,
}

export type Action =
  | { type: ActionType.GET_TOP_RATED_BEGIN }
  | { type: ActionType.GET_TOP_RATED_SUCCESS; payload: IMovie[] }
  | { type: ActionType.GET_TOP_RATED_ERROR }
  | { type: ActionType.QUERY_DATA_BEGIN }
  | { type: ActionType.QUERY_DATA_SUCCESS; payload: IQueryResults }
  | { type: ActionType.QUERY_DATA_ERROR }
  | { type: ActionType.GET_DETAILS_BEGIN }
  | { type: ActionType.GET_DETAILS_SUCCESS; payload: IMovieDetails }
  | { type: ActionType.GET_DETAILS_ERROR }
  | { type: ActionType.SET_TAB; payload: ActiveTab }
  | { type: ActionType.SET_SEARCH_TERM; payload: string }
  | { type: ActionType.RESET_DETAILS }
  | { type: ActionType.SET_PAGE; payload: number };
