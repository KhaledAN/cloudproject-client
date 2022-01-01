import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL + "/songs";
export const createSong = async reqData => {
  const { data } = await axios.post(API + "/", reqData);
  return data;
};

export const uploadSongFile = async (songId, file) => {
  const { data } = await axios.put(API + `/${songId}/file`, file);
  return data;
};
export const getSongs = async () => {
  const { data } = await axios.get(API + "/");
  return data;
};
