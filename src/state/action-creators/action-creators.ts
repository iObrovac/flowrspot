import { ActionType } from "../action-types/actionTypes";
import { Dispatch } from "react";
import { updateUserAction, IUserInfo } from "../actions/actions";

export const updateUserData = (data: IUserInfo) => {
  console.log("DATA: ", data);
  return (dispatch: Dispatch<updateUserAction>) => {
    dispatch({
      type: ActionType.UPDATE_USER,
      payload: data,
    });
  };
};
