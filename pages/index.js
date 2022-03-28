import Head from 'next/head'
import { genWebcam } from '../lib/utils/webcam'
import envConfig from "../lib/config/envConfig"
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  return {
    props: {
      backAddress: envConfig.backAddress
    }
  }
}

export default function Home({backAddress}) {
  return (
    <div>
      <Head>
        <title>Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {genWebcam(backAddress)}
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}