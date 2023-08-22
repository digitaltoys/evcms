import { useRef } from "react";

import Map from "../components/map";
import Layout from "../components/layouts/layout";
import { Sidebar } from "../components/sidebar";
import Sidemenu from "../components/sidemenu";

export default function HomePage() {
  const mapRef = useRef(null);

  return (
    <div className="relative inline-flex w-full h-full">
      {/* <Sidebar ref={mapRef} /> */}
      <Sidemenu />
      <Map ref={mapRef} />
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
