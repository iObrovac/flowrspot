import { IUser, IUserData } from "../../Types/IApp";
import { IUserLoginData } from "../../Types/IModals";
import Services from "./Services";

const FAVORITES = "flowers/favorites?page=1";
const USER = "users/me";
const RANDOM = "flowers/random";
const LOGIN = "users/login";
const NEW_ACC = "users/register";

export const fetchFavorites = () => Services.get(FAVORITES);
export const fetchFlowerInfo = (id: number) => Services.get(`flowers/${id}`);

export const deleteFav = (flowerID: number, likeID: number) =>
  Services.delete(`flowers/${flowerID}/favorites/${likeID}`);

export const postLikeFlower = (flowerID: number) =>
  Services.post(`flowers/${flowerID}/favorites`);

export const postMyComment = (id: number, payload: { content: string }) =>
  Services.post(`sightings/${id}/comments`, payload);

export const loginUser = (payload: IUserLoginData) =>
  Services.post(LOGIN, payload);
export const createNewUser = (payload: IUserData | IUser) =>
  Services.post(NEW_ACC, payload);

export const getDataAboutTheUser = () => Services.get(USER);

export const getSightingsData = (page: number) =>
  Services.get(`sightings?page=${page}`);

export const searchForFlowers = (input: string) =>
  Services.get(`flowers/search?query=${input}`);

export const fetchRandomFlowers = () => Services.get(RANDOM);

export const fetchOneSighting = (id: number) => Services.get(`sightings/${id}`);

export const fetchComments = (id: number) =>
  Services.get(`sightings/${id}/comments?page=1`);
