import { Button, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { login } from "../api/user";
import { useRouter } from "next/router";
import { errorProps } from "../utils/utils";
import { useState } from "react";
const LoginPage = ({ setIsAuth }) => {
  const { register, formState, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleLogin = async data => {
    try {
      const { token } = await login(data);
      localStorage.setItem("userAuthToken", token);
      router.push("/");
      setIsAuth(true);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  };
  const required = { value: true, message: "This field is required" };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sm={4} xs={12}>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <Stack direction="column" gap={2} component="form" onSubmit={handleSubmit(handleLogin)}>
              <Typography align="center" color="error">
                {error}
              </Typography>
              <TextField label="Email" {...errorProps(formState, "email")} {...register("email", { required })} />
              <TextField label="Passowrd" type="password" {...errorProps(formState, "password")} {...register("password", { required })} />
              <Button variant="contained" disabled={formState.isSubmitting} type="submit">
                Login
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
