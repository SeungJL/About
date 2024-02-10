import { ChakraProvider } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
// import "nprogress/nprogress.css";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import Layout from "../components/base/Layout";
import BottomNav from "../components2/BottomNav";

import "../styles/globals.css";
import "../styles/variable.css";
import theme from "../theme";

config.autoAddCss = false;
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
            onError: (err) => {
              console.error(err);
            },
          },
          mutations: {
            onError: (err) => {
              console.error(err);
            },
          },
        },
      }),
    []
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <RecoilRoot>
            <ChakraProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
                <BottomNav/>
              </Layout>
            </ChakraProvider>
          </RecoilRoot>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
