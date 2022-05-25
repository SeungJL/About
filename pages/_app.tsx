import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Header from '../models/components/layout/header'
import { ChakraProvider } from '@chakra-ui/react'

function App({ 
  Component, 
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Header /> 
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App
