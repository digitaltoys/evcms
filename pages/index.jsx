import { useState } from "react";
import Layout from "../components/layout";
import Map from "../components/map";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const LATITUDE = 37.569;
  const LONGITUDE = 126.98;
  return (
    <main className="w-full h-full flex">
      <div
        className={`inline-block ${
          isSidebarOpen ? "w-[390px]" : "w-0"
        } h-full bg-red-400 transition-all`}
      >
        <div>
          <button onClick={() => setIsSidebarOpen(false)}>사이드바 닫기</button>
        </div>
      </div>
      <div
        className={` ${
          isSidebarOpen ? "w-[calc(100%-390px)]" : "w-full"
        } h-full transition-all`}
      >
        <Map
          latitude={LATITUDE}
          longitude={LONGITUDE}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <button
        onClick={() => {
          setIsSidebarOpen(true);
        }}
      >
        사이드바 열기
      </button>
    </main>
  );
}

// Home.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };
