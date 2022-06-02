export interface IExampleFlower {
  id: number;
  favorite: boolean;
  latin_name: string;
  name: string;
  profile_picture: string;
  sightings: number;
  likeId?: number;
  description?: string;
  features?: string[];
}

export interface IFlowers {
  flowers: IExampleFlower[];
}
