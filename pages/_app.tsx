import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Script from "next/script";
import { useMemo, useEffect } from "react";
import { RecoilRoot } from "recoil";
import "nprogress/nprogress.css";
import "../styles/variable.css";

import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout";
import theme from "../theme";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useToken } from "../hooks/token/useToken";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

config.autoAddCss = false;

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const token = useToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

  return token ? (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <RecoilRoot>
            <ChakraProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </RecoilRoot>
        </SessionProvider>
      </QueryClientProvider>
    </>
  ) : (
    <></>
  );
}

export default App;
