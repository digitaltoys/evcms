import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="relative w-full h-full">
        <Navbar />
        <main className="w-full h-[calc(100%-4rem)]">{children}</main>
      </div>
    </>
  );
}
