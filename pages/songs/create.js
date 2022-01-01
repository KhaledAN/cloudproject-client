import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSong, uploadSongFile } from "../../api/songs";
import { SongGenre, SongStatus } from "../../constants/songs.enum";
import { required } from "../../utils/utils";
const CreateSongPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const [file, setFile] = useState(null);
  const handleAddSong = async data => {
    const { song } = await createSong(data);
    const formData = new FormData();
    formData.append("file", file);
    await uploadSongFile(song._id, formData);
  };
  return (
    <Card>
      <CardHeader title="Create song" />
      <CardContent>
        <Stack gap={2} component={"form"} onSubmit={handleSubmit(handleAddSong)}>
          <TextField label="Name" {...register("name", { required })} />
          <TextField label="length" {...register("length", { required })} />
          <FormControl>
            <InputLabel>Genre</InputLabel>
            <Select {...register("genre", { required })}>
              {Object.values(SongGenre).map(genre => (
                <MenuItem value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select {...register("status", { required })}>
              {Object.values(SongStatus).map(status => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <Button variant="contained" type="submit" disabled={formState.isSubmitting}>
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default CreateSongPage;
