import type { AppProps } from "next/app";
import Head from "next/head";
import { WordContextProvider } from "../context";
import { globalStyles } from "../styles/global";
import "../styles/globals.css";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WordContextProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </WordContextProvider>
  );
}
