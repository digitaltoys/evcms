import Layout from "../components/common/layout";
import "../styles/globals.css";
import "../styles/components/map.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
