// import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-screen h-screen">
        <div>Navbar</div>
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
