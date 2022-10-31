import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import Footer from "../components/Footer";
import useApiService from "../hooks/useApiService";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import TopNavbar from "../components/TopNavbar";

function MyApp({ Component, pageProps }: AppProps) {

  const api = useApiService();
  const [loginLoading, setLoginLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token") ?? '');
  });

  useEffect(() => {
      const fetcher = async () => {
        try {
          const result = await api.checkToken(token ?? '');
          if (result.status !== '1') {
            await router.push("/login");
          }
        } catch (error) {
          await router.push("/login");
        }
        setLoginLoading(false);
      };
      if (window.location.pathname !== '/login') {
        fetcher().then();
      } else {
        setLoginLoading(false);
      }
  }, [token]);

  return (
    <>
        <TopNavbar />
        {loginLoading ? (
            <LoadingSpinner />
        ): (
            <Component {...pageProps} />
        )}
      <Footer />
    </>
  );
}

export default MyApp
