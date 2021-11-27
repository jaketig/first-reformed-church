import video from '../models/video'
import dbConnect from "../lib/dbConnect";

export default function Video({video}) {
  return (
    <pre>{JSON.stringify(video, undefined, 2)}</pre>
  )
}

export async function getStaticProps() {
  await dbConnect();

  const latestVideo = await video.findOne({}).sort({publishedAt: -1}).lean();

  return {
    props: {
      video: latestVideo
    },
    revalidate: 60
  }
}
