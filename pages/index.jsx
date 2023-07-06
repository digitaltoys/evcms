import Image from 'next/image'
import Layout from '../components/layout'

export default function Home() {
  return (
    // <RootLayout>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Home contents</div>
    </main>
    // </RootLayout>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}