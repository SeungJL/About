import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Header from '../components/layout/header'
import { Box, ChakraProvider } from '@chakra-ui/react'
import Footer from '../components/layout/footer'

function App({ 
  Component, 
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
          <Header />
          <Box as='main' paddingBottom='70px' minHeight='92vh'>
            <Component {...pageProps} />
          </Box>
          <Footer />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App
