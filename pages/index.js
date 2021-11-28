import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Video from '../components/video'
import dbConnect from "../lib/dbConnect";
import video from "../models/video";

export default function Home({latestVideo}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="First reformed church" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Video video={latestVideo}></Video>
    </div>
  )
}

export async function getStaticProps() {
  await dbConnect();

  const latestVideo = await video.findOne({}).sort({publishedAt: -1}).lean();

  console.log(latestVideo)

  return {
    props: {
      latestVideo
    },
    revalidate: 60
  }
}
