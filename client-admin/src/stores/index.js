import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import animeReducer from "./reducers/dataReducers";
import UserReducer from "./reducers/userReducer";
import toggleReducer from "./reducers/toggleReducer";

const RootReducer = combineReducers({
  anime: animeReducer,
  user: UserReducer,
  toggle: toggleReducer,
});

const store = createStore(RootReducer, applyMiddleware(thunk));
export default store;
