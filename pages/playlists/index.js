import { Button, Card, CardContent, CardHeader, CircularProgress, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../api/user";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadPlaylists = async () => {
    setLoading(true);
    const { playlists } = await getUserPlaylists();
    setPlaylists(playlists);
    setLoading(false);
  };
  useEffect(() => {
    loadPlaylists();
  }, []);
  return (
    <Card>
      <CardHeader title={"Playlists"} action={<Button onClick={() => router.push("/playlists/create")}>Create playlist</Button>}></CardHeader>
      <CardContent>
        <Stack gap={2}>{loading ? <CircularProgress /> : playlists.map(playlist => <PlaylistCard playlist={playlist} />)} </Stack>
      </CardContent>
    </Card>
  );
};
export default Home;
