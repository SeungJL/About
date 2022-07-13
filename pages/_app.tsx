import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Header from '../components/layout/header'
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import Footer from '../components/layout/footer'
import { QueryClient, QueryClientProvider } from 'react-query'
import Script from 'next/script'
import theme from './theme'

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID

function App({ 
  Component, 
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Script strategy='beforeInteractive' src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}></Script>

      <SessionProvider session={session}>
        <QueryClientProvider client={new QueryClient()}>
          <ChakraProvider>
            <Header />
            <Box as='main' paddingBottom='70px' minHeight='92vh'>
              <Component {...pageProps} />
            </Box>
            <Footer />
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}

export default App
