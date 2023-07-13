import Map from "../components/map";
import Sidebar from "../components/sidebar";

export default function Home() {
  console.log("index------------------------");

  return (
    <div className="relative inline-flex w-full h-full">
      <Sidebar />
      <Map />
    </div>
  );
}
