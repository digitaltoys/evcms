// import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <div>Navbar</div>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}