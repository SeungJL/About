import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Script from "next/script";
import { useMemo } from "react";
import { RecoilRoot } from "recoil";
import "nprogress/nprogress.css";
import "../styles/variable.css";

import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout/Layout";

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
config.autoAddCss = false;
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
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ChakraProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </SessionProvider>
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
      ></Script>
    </>
  );
}

export default App;
