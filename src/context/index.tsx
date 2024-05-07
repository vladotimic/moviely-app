import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IState, IMovie, ActionType, ActiveTab, IQueryResults } from '@/types';
import { getBySearchQuery, getTopRated, getById } from '@/services/movie';
import reducer from './reducer';

const initialState: IState = {
  data: [],
  details: undefined,
  activeTab: 'tv',
  searchTerm: '',
  isQuery: false,
  loading: true,
  error: false,
  currentPage: 1,
  pageSize: 1,
};

interface IAppContext extends IState {
  fetchTopRated: (cache: IMovie[]) => Promise<void>;
  fetchSearch: (term: string, cache: IQueryResults) => Promise<void>;
  fetchDetails: (id: string, tab: ActiveTab) => Promise<void>;
  setActiveTab: (tab: ActiveTab) => void;
  setSearchTerm: (term: string) => void;
  resetDetails: () => void;
  setPage: (page: number) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const { activeTab, currentPage } = state;

  const fetchTopRated = useCallback(
    async (cache: IMovie[]) => {
      dispatch({ type: ActionType.GET_TOP_RATED_BEGIN });
      try {
        let data = cache;
        if (!cache) {
          data = await getTopRated(activeTab);
        }
        dispatch({ type: ActionType.GET_TOP_RATED_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: ActionType.GET_TOP_RATED_ERROR });
      }
    },
    [activeTab],
  );

  const fetchSearch = useCallback(
    async (query: string, cache: IQueryResults) => {
      dispatch({ type: ActionType.QUERY_DATA_BEGIN });
      try {
        let data = cache;
        if (!cache.data) {
          data = await getBySearchQuery(activeTab, query, currentPage);
        }
        dispatch({ type: ActionType.QUERY_DATA_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: ActionType.QUERY_DATA_ERROR });
      }
    },
    [activeTab, currentPage],
  );

  const fetchDetails = useCallback(async (id: string, tab: ActiveTab) => {
    dispatch({ type: ActionType.GET_DETAILS_BEGIN });
    try {
      const data = await getById(id, tab);
      dispatch({
        type: ActionType.GET_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ActionType.GET_DETAILS_ERROR });
    }
  }, []);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    dispatch({ type: ActionType.SET_TAB, payload: tab });
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: ActionType.SET_SEARCH_TERM, payload: term });
  }, []);

  const resetDetails = useCallback(() => {
    dispatch({ type: ActionType.RESET_DETAILS });
  }, []);

  const setPage = useCallback(
    (page: number) => {
      navigate('', { state: null, replace: true });
      dispatch({ type: ActionType.SET_PAGE, payload: page });
    },
    [navigate],
  );

  const value = useMemo(
    () => ({
      ...state,
      fetchTopRated,
      fetchSearch,
      fetchDetails,
      setActiveTab,
      setSearchTerm,
      resetDetails,
      setPage,
    }),
    [
      state,
      fetchTopRated,
      fetchSearch,
      fetchDetails,
      setActiveTab,
      setSearchTerm,
      resetDetails,
      setPage,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'Context has to be used within <CurrentUserContext.Provider>',
    );
  }

  return context;
};
