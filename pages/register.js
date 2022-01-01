import { Button, Card, CardContent, CardHeader, Grid, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../api/user";
import { useRouter } from "next/router";
import Link from "next/link";
const RegisterPage = () => {
  const { register, formState, handleSubmit } = useForm();
  const router = useRouter();
  const handleLogin = async data => {
    await registerUser(data);
    router.push("/login");
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sm={4} xs={12}>
        <Card>
          <CardHeader title="Registeration" />
          <CardContent>
            <Stack direction="column" gap={2} component="form" onSubmit={handleSubmit(handleLogin)}>
              <TextField label="First Name" {...register("firstName", { required: true })} />
              <TextField label="Last Name" {...register("lastName", { required: true })} />
              <TextField label="Email" {...register("phone", { required: true })} />
              <TextField label="Phone Number" {...register("email", { required: true })} />
              <TextField label="Passowrd" type="password" {...register("password", { required: true })} />
              <Button variant="contained" disabled={formState.isSubmitting} type="submit">
                Register
              </Button>
              <Link href="/login">
                <Button variant="contained" color="secondary" disabled={formState.isSubmitting}>
                  Login
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default RegisterPage;
