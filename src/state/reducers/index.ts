import { combineReducers } from "redux";
import { ISingleFlower } from "../../Types/ICard";
import { IComment } from "../../Types/ISightings";
import commentReducer from "./commentsReducer";
import flowerReducer from "./flowerReducer";
import userReducer, { IState } from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  favFlowers: flowerReducer,
  comments: commentReducer,
});

export default reducers;

export type State = {
  user: IState;
  favFlowers: ISingleFlower[];
  comments: IComment[];
};
