import {
  FETCH_ALL_SUCCESS,
  FETCH_ONE_SUCCESS,
  SET_LOADING,
  SET_LOADING_DETAIL,
  SET_ERROR,
} from "../actions/actionTypes";

const initialState = {
  data: [],
  dataDetail: {},
  loading: true,
  loadingDetail: true,
  error: "",
};
function animeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_DETAIL:
      return {
        ...state,
        loadingDetail: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default animeReducer;
