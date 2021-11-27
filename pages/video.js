import {youtube} from "@googleapis/youtube"

export default function Video({videos}) {
  return (
    <pre>{JSON.stringify(videos, undefined, 2)}</pre>
  )
}

export async function getStaticProps() {

  //setup youtube client
  const client = await youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  })

  //download last 5 videos from youtube
  const resp = await client.search.list({
    part: 'snippet',
    channelId: process.env.YOUTUBE_CHANNEL_ID,
    order: 'date'
  })

  return {
    props: {
      videos: resp?.data?.items || []
    },
    revalidate: 3600
  }
}
