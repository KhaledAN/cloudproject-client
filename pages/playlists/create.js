import { Button, Card, CardContent, CardHeader, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createPlaylist } from "../../api/playlists";
import { required } from "../../utils/utils";

const CreatePlaylist = () => {
  const { register, formState, handleSubmit } = useForm();
  const router = useRouter();
  const handleCreate = async data => {
    await createPlaylist(data);
    router.push("/playlists");
  };
  return (
    <Card>
      <CardHeader title="Create playlist"></CardHeader>
      <CardContent>
        <Stack direction={"column"} gap={2} component={"form"} onSubmit={handleSubmit(handleCreate)}>
          <TextField label="Name" {...register("name", { required })} />
          <FormControlLabel label={"Public"} control={<Switch {...register("public", { required })} />} />
          <Button type="submit" disabled={formState.isSubmitting} variant="contained">
            Create
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default CreatePlaylist;
