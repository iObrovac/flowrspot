import { combineReducers } from "redux";
import { ISingleFlower } from "../../Types/ICard";
import flowerReducer from "./flowerReducer";
import userReducer, { IState } from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  favFlowers: flowerReducer,
});

export default reducers;

export type State = {
  user: IState;
  favFlowers: ISingleFlower[];
};
