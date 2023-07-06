import Image from 'next/image'
import Layout from '../components/layout'

export default function About() {
  return (
    // <RootLayout>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>About contents</div>
    </main>
    // </RootLayout>
  )
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}