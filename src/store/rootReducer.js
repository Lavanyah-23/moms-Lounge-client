import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import story from "./story/reducer";

export default combineReducers({
  appState,
  user,
  story,
});
