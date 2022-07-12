export interface IUser {
  full_name: string;
  id: number;
}

export interface IFlower {
  id: number;
  latin_name: string;
  name: string;
  profile_picture: string;
}

export interface ISightings {
  comments_count: number;
  created_at: string;
  description: string;
  flower: IFlower;
  id: number;
  likes_count: number;
  latitude: number;
  longitude: number;
  name: string;
  picture: string;
  user: IUser;
}

export interface IReturnValues {
  sightings: ISightings[];
}

export interface IComment {
  id: number;
  user_id: number;
  user_full_name: string;
  sighting_id: number;
  content: string;
}

export interface IPages {
  current_page: number;
  prev_page: number;
  next_page: number;
  total_pages: number;
}
