import { IExampleFlower } from "./IHome";

export interface ICardProps {
  flowerData: IExampleFlower;
  refreshFavorites: () => void;
}

export interface ILikeFlowerResponse {
  data: IFavFlower;
}

export interface IFavFlower {
  flower: IExampleFlower;
  id: number;
  user_id: number;
}

export interface IGetFavorites {
  fav_flowers: ISingleFlower[];
}

export interface ISingleFlower {
  flower: IExampleFlower;
  id: number;
  user_id: number;
}

export interface IDeleteResponse {
  fav_flower: IDeleteSingle;
}

export interface IDeleteSingle {
  flower: IExampleFlower;
  id: number;
  user_id: number;
}
