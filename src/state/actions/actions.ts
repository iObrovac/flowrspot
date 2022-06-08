import { ActionType } from "../action-types/actionTypes";

export interface IUserInfo {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

export interface updateUserAction {
  type: ActionType.UPDATE_USER;
  payload: IUserInfo;
}
