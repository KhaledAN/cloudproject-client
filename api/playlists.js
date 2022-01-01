import axios from "axios";
import { attachToken } from "../utils/utils";
const API = process.env.NEXT_PUBLIC_API_URL;
export const createPlaylist = async reqData => {
  attachToken(axios);
  const { data } = await axios.post(API + "/users/playlists", reqData);
  return data;
};

export const getPlaylistDetails = async playlistId => {
  attachToken(axios);
  const { data } = await axios.get(API + "/users/playlists/" + playlistId);
  return data;
};

export const addSongsToPlaylist = async (playlistId, songsIds) => {
  attachToken(axios);
  const { data } = await axios.post(API + `/users/playlists/${playlistId}/songs`, songsIds);
  return data;
};
export const removeSongsToPlaylist = async (playlistId, songsIds) => {
  attachToken(axios);
  const { data } = await axios.put(API + `/users/playlists/${playlistId}/songs`, songsIds);
  return data;
};
