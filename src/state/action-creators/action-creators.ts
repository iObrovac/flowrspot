import {
  ActionComments,
  ActionFlowers,
  ActionType,
} from "../action-types/actionTypes";
import { Dispatch } from "react";
import {
  updateUserAction,
  IUserInfo,
  updateFavoriteFlowers,
  deleteOneFlower,
} from "../actions/actions";
import { ISingleFlower } from "../../Types/ICard";
import { IComment } from "../../Types/ISightings";

export const updateUserData = (data: IUserInfo) => {
  return (dispatch: Dispatch<updateUserAction>) => {
    dispatch({
      type: ActionType.UPDATE_USER,
      payload: data,
    });
  };
};

export const updateFavFlowers = (flowers: ISingleFlower[]) => {
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

export const updateSightingComments = (value: IComment[]) => ({
  type: ActionComments.UPDATE_COMMENTS,
  payload: value,
});
