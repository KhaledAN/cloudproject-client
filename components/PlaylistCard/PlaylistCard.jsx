import { ChevronRight } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Grid, IconButton, Radio, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import SongCard from "../SongCard/SongCard";

const PlaylistCard = ({ playlist, showSongs, selected, setSelected }) => {
  const router = useRouter();
  return (
    <Grid container>
      {setSelected && (
        <Grid item>
          <Radio checked={selected == playlist._id} onChange={e => e.target.checked && setSelected(playlist._id)} />{" "}
        </Grid>
      )}
      <Grid item xs>
        <Card>
          <CardHeader
            title={playlist.name}
            subheader={`${playlist.songs.length} Songs`}
            action={
              !showSongs && (
                <IconButton onClick={() => router.push(`/playlists/[playlistId]`, `/playlists/${playlist._id}`)}>
                  <ChevronRight />
                </IconButton>
              )
            }
          />
          {showSongs && (
            <CardContent>
              <Stack gap={2}>
                {playlist.songs.map(song => (
                  <SongCard song={song} />
                ))}
              </Stack>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};
export default PlaylistCard;
