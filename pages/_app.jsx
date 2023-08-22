import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "simplebar-react/dist/simplebar.min.css";

import "../styles/globals.css";
import "../styles/components/map.css";

config.autoAddCss = false;

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
