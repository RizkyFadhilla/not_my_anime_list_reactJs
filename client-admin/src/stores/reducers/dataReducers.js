import {
  FETCH_ALL_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  FETCH_GENRE_SUCCESS,
  FETCH_GENRE_BY_ID_SUCCESS,
  ADD_DATA,
  SET_LOADING_EDIT_GENRE,
} from "../actions/actionTypes";

const initialState = {
  data: [],
  addResponse: "",
  genreData: [],
  loading: true,
  error: "",
  toggle: false,
  genreById: {},
  loadingGenre: true,
};
function animeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_GENRE_SUCCESS:
      return {
        ...state,
        genreData: action.payload,
      };
    case FETCH_GENRE_BY_ID_SUCCESS:
      return {
        ...state,
        genreById: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_EDIT_GENRE:
      return {
        ...state,
        loadingGenre: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_DATA:
      return {
        ...state,
        addResponse: action.payload,
      };
    default:
      return state;
  }
}

export default animeReducer;
