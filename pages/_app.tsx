import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

import dotenv from 'dotenv'
dotenv.config()

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Memefeed</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Favicons: https://realfavicongenerator.net/ */}
      <link rel="icon" href="favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e08909" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      {/* Open Graph */}
      <meta property="og:title" content="Memefeed" />
      <meta property="og:site_name" content="Memefeed" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.memefeed.xyz/" />
      <meta property="og:image" content="/og-preview.png" />
      <meta property="og:description" content="Memefeed - live memes for every community" />
      <meta property="description" content="Memefeed - live memes for every community" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Memefeed" />
      <meta name="twitter:description" content="Memefeed - live memes for every community" />
      <meta name="twitter:image" content="/og-preview.png" />
    </Head>
    <Component {...pageProps} />
    <Analytics />
  </>
)

export default App
