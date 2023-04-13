import { combineReducers } from "redux";
import menu from "./menu/reducer";
import userReducer from "./reducers/users";

const reducers = combineReducers({
  menu,
  user: userReducer,
});

export default reducers;
