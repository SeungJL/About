import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Header from '../models/components/layout/header'

function App({ 
  Component, 
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header /> 
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
