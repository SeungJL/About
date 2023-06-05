import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import { RecoilRoot } from "recoil";
import "nprogress/nprogress.css";
import "../styles/variable.css";

import Head from "next/head";

import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout";
import theme from "../theme";
import axios from "axios";
import { useToken } from "../hooks/token/useToken";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
  );
}

export default App;
