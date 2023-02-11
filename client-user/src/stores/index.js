import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import animeReducer from "./reducers/animeReducer";

const store = createStore(animeReducer, applyMiddleware(thunk));

export default store;
