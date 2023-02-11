import {
  ADD_ANIME_TOGGLE,
  VIEW_CAST_TOGGLE,
  ADD_GENRE_TOGGLE,
  EDIT_GENRE_TOGGLE,
} from "../actions/actionTypes";

const initialState = {
  addAnimeToggle: false,
  viewCastToggle: false,
  viewGenreToggle: false,
  editGenreToggle: false,
  dataCast: [],
};
function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ANIME_TOGGLE:
      return {
        ...state,
        addAnimeToggle: action.payload,
      };
    case VIEW_CAST_TOGGLE:
      return {
        ...state,
        viewCastToggle: action.payload[0],
        dataCast: action.payload[1],
      };
    case ADD_GENRE_TOGGLE:
      return {
        ...state,
        viewGenreToggle: action.payload,
      };
    case EDIT_GENRE_TOGGLE:
      return {
        ...state,
        editGenreToggle: action.payload,
      };

    default:
      return state;
  }
}
export default toggleReducer;
