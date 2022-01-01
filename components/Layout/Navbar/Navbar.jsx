import { Button, Grid, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../api/user";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("userAuthToken");
    Router.reload();
  };
  const loadUserInfo = async () => {
    const { user } = await getUserInfo();
    setUserInfo(user);
    window.user = user;
  };
  useEffect(() => {
    loadUserInfo();
    window.loadUserInfo = loadUserInfo;
  }, []);
  const routes = [
    { href: "/playlists", label: "Playlists" },
    { href: "/songs", label: "Songs" },
  ];
  return (
    <Grid container justifyContent="space-between" sx={{ position: "fixed", top: 0, background: "#a39292", padding: "1rem", zIndex: 100 }}>
      <Grid item>
        <Typography>Kytify</Typography>
      </Grid>
      <Grid item>
        <Stack direction="row" gap={2}>
          {routes.map(route => (
            <Link href={route.href}>
              <Typography className={clsx("link", { active: router.asPath.includes(route.href) })}>{route.label}</Typography>
            </Link>
          ))}
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="row" gap={2}>
          <Typography>{userInfo?.firstName}</Typography>
          <Button variant="contained" size="small" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Navbar;
