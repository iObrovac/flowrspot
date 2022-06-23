import { ActionFlowers, ActionType } from "../action-types/actionTypes";
import { Dispatch } from "react";
import {
  updateUserAction,
  IUserInfo,
  updateFavoriteFlowers,
  deleteOneFlower,
} from "../actions/actions";
import { ISingleFlower } from "../../Types/ICard";

export const updateUserData = (data: IUserInfo) => {
  console.log("DATA: ", data);
  return (dispatch: Dispatch<updateUserAction>) => {
    dispatch({
      type: ActionType.UPDATE_USER,
      payload: data,
    });
  };
};

export const updateFavFlowers = (flowers: ISingleFlower[]) => {
  console.log("FAV FLOWERS IZ ACTION CREATORA", flowers);
  return (dispatch: Dispatch<updateFavoriteFlowers>) => {
    dispatch({
      type: ActionFlowers.UPDATE_FAVORITE_FLOWERS,
      payload: flowers,
    });
  };
};

export const deleteOneFavFlower = (id: number) => {
  return (dispatch: Dispatch<deleteOneFlower>) => {
    dispatch({
      type: ActionFlowers.DELETE_FLOWER,
      payload: id,
    });
  };
};
