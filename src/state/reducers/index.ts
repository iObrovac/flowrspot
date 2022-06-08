import { combineReducers } from "redux";
import userReducer, { IState } from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;

export type State = {
  user: IState;
};
