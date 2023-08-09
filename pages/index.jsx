import { useRef } from "react";

import Map from "../components/map";
import { Sidebar } from "../components/sidebar";
import Layout from "../components/layouts/layout";

export default function Home() {
  const mapRef = useRef(null);

  return (
    <div className="relative inline-flex w-full h-full">
      <Sidebar ref={mapRef} />
      <Map ref={mapRef} />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
