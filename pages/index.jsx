import Layout from "../components/layout";
import Map from "../components/map";

export default function Home() {
  // SK 에너지 본사 위도경도
  const LATITUDE = 37.569;
  const LONGITUDE = 126.98;
  return (
    <main className="w-full h-full">
      <Map latitude={LATITUDE} longitude={LONGITUDE} />
    </main>
  );
}

// Home.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };
