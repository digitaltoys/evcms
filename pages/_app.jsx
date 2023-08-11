import Head from "next/head";

import "../styles/globals.css";
import "../styles/components/map.css";
import "simplebar-react/dist/simplebar.min.css";

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>OCUBE EVCMS</title>
        <link rel="icon" href="/ocube_favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
