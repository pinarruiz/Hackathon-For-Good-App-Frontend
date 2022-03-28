import Head from 'next/head'
import dynamic from 'next/dynamic'
import envConfig from "../lib/config/envConfig"

export async function getStaticProps() {
  return {
    props: {
      backAddress: envConfig.backAddress
    }
  }
}

export default function RenderMap() {

  const Map = dynamic(
    () => import('../lib/utils/map/main'),
    { ssr: false }
  )

  return (
    <div>
      <Head>
        <title>Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Map/>
      </main>

      <footer>
      </footer>
    </div>
  )
}