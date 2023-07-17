import { ChakraProvider } from "@chakra-ui/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "nprogress/nprogress.css";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/variable.css";
import theme from "../theme";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
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
  );
}

export default App;
