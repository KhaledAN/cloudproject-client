import { Button, Card, CardContent, CardHeader, CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSongs } from "../../api/songs";
import SongCard from "../../components/SongCard/SongCard";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadSongs = async () => {
    const { songs } = await getSongs();
    setSongs(songs);
    setLoading(false);
  };
  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <Card>
      <CardHeader title={"Songs"} action={<Button onClick={() => router.push("/songs/create")}>Add Song</Button>} />
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <Stack gap={2}>
            {songs.map(song => (
              <SongCard song={song} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default SongsPage;
