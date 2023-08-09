import Head from "next/head";

import "../styles/globals.css";
import "../styles/components/map.css";
import "simplebar-react/dist/simplebar.min.css";
import Layout from "../components/common/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>전기차 충전소 조회</title>
        <link rel="icon" href="/ocube.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
