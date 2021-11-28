import Head from 'next/head'
import { Container } from '@mui/material'
import Video from '../components/video'
import dbConnect from "../lib/dbConnect";
import video from "../models/video";

export default function Home({latestVideo}) {
  return (
    <>
      <Head>
        <title>First Reformed Church</title>
        <meta name="description" content="First reformed church" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Video video={latestVideo}></Video>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  await dbConnect();

  const latestVideo = await video.findOne({}).sort({publishedAt: -1}).lean();

  return {
    props: {
      latestVideo
    },
    revalidate: 60
  }
}
