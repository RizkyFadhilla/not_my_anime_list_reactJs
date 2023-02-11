import {
  LOGIN,
  REGISTER,
  SET_LOADING,
  SET_ERROR,
} from "../actions/actionTypes";
const initialState = {
  access_token: localStorage.access_token,
  role: localStorage.role,
  registerUser: [],
  loading: true,
  error: "",
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        access_token: action.payload.access_token,
        role: action.payload.role,
      };
    case REGISTER:
      return {
        ...state,
        registerUser: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
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
export default UserReducer;
