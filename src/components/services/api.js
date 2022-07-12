import Services from "./Services";

const FAVORITES = "flowers/favorites?page=1";
const USER = "users/me";
const SIGHTINGS = "sightings?page=6";
const RANDOM = "flowers/random";
const LOGIN = "users/login";
const NEW_ACC = "users/register";

export const fetchFavorites = () => Services.get(FAVORITES);
export const fetchFlowerInfo = (id) => Services.get(`flowers/${id}`);

export const deleteFav = (flowerID, likeID) =>
  Services.delete(`flowers/${flowerID}/favorites/${likeID}`);

export const postLikeFlower = (flowerID) =>
  Services.post(`flowers/${flowerID}/favorites`);

export const postMyComment = (id, payload) =>
  Services.post(`sightings/${id}/comments`, payload);

export const loginUser = (payload) => Services.post(LOGIN, payload);
export const createNewUser = (payload) => Services.post(NEW_ACC, payload);

export const getDataAboutTheUser = () => Services.get(USER);

export const getSightingsData = () => Services.get(SIGHTINGS);

export const searchForFlowers = (input) =>
  Services.get(`flowers/search?query=${input}`);

export const fetchRandomFlowers = () => Services.get(RANDOM);

export const fetchOneSighting = (id) => Services.get(`sightings/${id}`);

export const fetchComments = (id) =>
  Services.get(`sightings/${id}/comments?page=1`);
