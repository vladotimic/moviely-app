import { IState, ActionType, Action } from '@/types';

function reducer(state: IState, action: Action): IState {
  const { type } = action;
  if (type === ActionType.GET_TOP_RATED_BEGIN) {
    return {
      ...state,
      data: [],
      loading: true,
      error: false,
    };
  }
  if (type === ActionType.GET_TOP_RATED_SUCCESS) {
    const list = action.payload.slice(0, 10);
    return {
      ...state,
      loading: false,
      error: false,
      data: list,
      currentPage: 1,
      pageSize: 1,
    };
  }
  if (type === ActionType.GET_TOP_RATED_ERROR) {
    return {
      ...state,
      data: [],
      loading: false,
      error: true,
    };
  }
  if (type === ActionType.QUERY_DATA_BEGIN) {
    return {
      ...state,
      data: [],
      loading: true,
      error: false,
    };
  }
  if (type === ActionType.QUERY_DATA_SUCCESS) {
    const { data, pageSize, currentPage } = action.payload;
    return {
      ...state,
      loading: false,
      error: false,
      data,
      currentPage,
      pageSize,
    };
  }
  if (type === ActionType.QUERY_DATA_ERROR) {
    return {
      ...state,
      data: [],
      loading: false,
      error: true,
    };
  }
  if (type === ActionType.GET_DETAILS_BEGIN) {
    return {
      ...state,
      loading: true,
      error: false,
    };
  }
  if (type === ActionType.GET_DETAILS_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: false,
      details: action.payload,
    };
  }
  if (type === ActionType.GET_DETAILS_ERROR) {
    return {
      ...state,
      loading: false,
      error: true,
    };
  }
  if (type === ActionType.SET_TAB) {
    return {
      ...state,
      activeTab: action.payload,
    };
  }
  if (type === ActionType.SET_SEARCH_TERM) {
    const searchTerm = action.payload;
    return {
      ...state,
      searchTerm,
      isQuery: searchTerm.length >= 3,
    };
  }
  if (type === ActionType.RESET_DETAILS) {
    return {
      ...state,
      details: undefined,
    };
  }
  if (type === ActionType.SET_PAGE) {
    return {
      ...state,
      currentPage: action.payload,
    };
  }
  return { ...state };
}
export default reducer;
