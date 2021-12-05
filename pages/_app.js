import '../styles/global.css'
import PropTypes from 'prop-types';
import Layout from '../components/Layout'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../lib/createEmotionCache';
import Head from "next/head";
import { SWRConfig } from 'swr'
import fetchJson from '../lib/fetchJson'
import {AuthProvider} from "../lib/auth/AuthProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SWRConfig value={{ fetcher: fetchJson }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Layout Component={Component}>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </CacheProvider>
    </SWRConfig>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
