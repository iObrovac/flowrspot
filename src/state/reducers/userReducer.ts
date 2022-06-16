import { ActionType } from "../action-types/actionTypes";
import { updateUserAction } from "../actions/actions";

export interface IState {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

const initialState = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
};

const userReducer = (
  state: IState = initialState,
  action: updateUserAction
) => {
  switch (action.type) {
    case ActionType.UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
