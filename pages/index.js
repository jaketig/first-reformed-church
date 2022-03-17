import Head from 'next/head'
import { Container } from '@mui/material'
import Video from '../components/Video'
import dbConnect from "../lib/dbConnect";
import video from "../models/Video";
import HomepageHero from "../components/HomepageHero";



function Home({latestVideo}) {
  return (
    <>
      <Head>
        <title>First Reformed Church</title>
        <meta name="description" content="First reformed church" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomepageHero/>


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

Home.HasHero = true;

export default Home;