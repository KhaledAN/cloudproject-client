import axios from "axios";
import { attachToken } from "../utils/utils";
const API = process.env.NEXT_PUBLIC_API_URL;
export const login = async reqData => {
  const { data } = await axios.post(API + "/users/login", reqData);
  return data;
};

export const register = async reqData => {
  const { data } = await axios.post(API + "/users/register", reqData);
  return data;
};

export const getUserPlaylists = async () => {
  attachToken(axios);
  const { data } = await axios.get(API + "/users/playlists");
  return data;
};

export const getUserInfo = async () => {
  attachToken(axios);
  const { data } = await axios.get(API + "/users/personalInfo");
  return data;
};
