import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import LoginPage from "./login";
import RegisterPage from "./register";

function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem("userAuthToken")));
  }, []);

  if (!isAuth) {
    switch (router.asPath) {
      case "/login":
        return <LoginPage setIsAuth={setIsAuth} />;
      default:
        return <RegisterPage />;
    }
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
