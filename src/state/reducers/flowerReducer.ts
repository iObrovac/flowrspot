import { ISingleFlower } from "../../Types/ICard";
import { ActionFlowers } from "../action-types/actionTypes";
import { deleteOneFlower, updateFavoriteFlowers } from "../actions/actions";

const flowerReducer = (
  state: ISingleFlower[] = [],
  action: updateFavoriteFlowers | deleteOneFlower
) => {
  switch (action.type) {
    case ActionFlowers.UPDATE_FAVORITE_FLOWERS:
      return action.payload;
    case ActionFlowers.DELETE_FLOWER:
      return state.filter((flower) => flower.id !== action.payload);
    default:
      return state;
  }
};

export default flowerReducer;
