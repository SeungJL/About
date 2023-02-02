import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Header from "../components/layout/header";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/layout/footer";
import { QueryClient, QueryClientProvider } from "react-query";
import Script from "next/script";
import { useMemo, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import styled from "styled-components";
import { CenterDiv, FullScreen } from "../styles/LayoutStyles";
import Cover from "../components/Cover";
import "../styles/variable.css";

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;

const Container = styled.div`
  border: 1px solid rgb(0, 0, 0, 0.1);
`;

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      }),
    []
  );

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
      ></Script>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ChakraProvider>
              <Container as="main">
                <Component {...pageProps} />
              </Container>
            </ChakraProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default App;
