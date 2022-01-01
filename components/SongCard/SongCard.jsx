import { Add, Download, Favorite } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addSongsToPlaylist, removeSongsToPlaylist } from "../../api/playlists";
import { getUserPlaylists } from "../../api/user";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

const SongCard = ({ song }) => {
  const [isLiked, setIsLiked] = useState(window.user.likes.songs.some(({ _id }) => _id == song._id));
  const handleLike = async () => {
    if (isLiked) {
      await removeSongsToPlaylist(window.user.likes._id, { songsIds: [song._id] });
    } else {
      await addSongsToPlaylist(window.user.likes._id, { songsIds: [song._id] });
    }
    setIsLiked(!isLiked);
  };
  const [open, setOpen] = useState(null);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", padding: "0.5rem" }}
    >
      <Typography>
        {song.name} - {song.length / 100} min
      </Typography>
      <Stack direction={"row"}>
        <Tooltip title="Download">
          <IconButton
            onClick={() => {
              window.location.href = process.env.NEXT_PUBLIC_API_URL + `/songs/${song._id}/file`;
            }}
          >
            <Download />
          </IconButton>
        </Tooltip>
        <PlaylistsDialog open={open} setOpen={setOpen} songId={song._id} />
        <Tooltip title="Add to playlist">
          <IconButton onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="Like">
          <IconButton onClick={handleLike}>
            <Favorite color={isLiked ? "primary" : "inherit"} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default SongCard;

const PlaylistsDialog = ({ open, setOpen, songId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const loadPlaylists = async () => {
    setLoading(true);
    const { playlists } = await getUserPlaylists();
    setPlaylists(playlists);
    setLoading(false);
  };
  const handleAddToPlaylist = async () => {
    await addSongsToPlaylist(selected, { songsIds: [songId] });
    setOpen(false);
  };
  useEffect(() => {
    loadPlaylists();
  }, []);
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogContent>
        <Stack gap={2}>
          {loading ? (
            <CircularProgress />
          ) : (
            playlists.map(playlist => <PlaylistCard playlist={playlist} selected={selected} setSelected={setSelected} />)
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddToPlaylist} disabled={!selected}>
          Add
        </Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
