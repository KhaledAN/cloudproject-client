import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPlaylistDetails } from "../../api/playlists";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";
import { CircularProgress } from "@mui/material";
const PlaylistDetailsPage = () => {
  const router = useRouter();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playlistId } = router.query;
  const loadPlaylistData = async () => {
    const { playlist } = await getPlaylistDetails(playlistId);
    setPlaylist(playlist);
    setLoading(false);
  };
  useEffect(() => {
    if (playlistId) loadPlaylistData();
  }, [playlistId]);
  if (loading) {
    return <CircularProgress />;
  }
  return <PlaylistCard playlist={playlist} showSongs />;
};
export default PlaylistDetailsPage;
