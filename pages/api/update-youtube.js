import {youtube} from "@googleapis/youtube"
import Video from '../../models/video'
import dbConnect from '../../lib/dbConnect'

export default async function(req, res) {
  try {
    if (req.method === 'POST') {

      // verify API key
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {

        //connect to mongo
        await dbConnect();

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

        if (resp?.data?.items) {
          for (let i = 0; i < resp.data.items.length; i++) {
            const item = resp.data.items[i];

            //upsert video to mongo
            await Video.updateOne({
              _id: item.id.videoId,
            }, {
              $set: {
                publishedAt: item.snippet.publishedAt,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: {
                  url: item.snippet.thumbnails.high.url,
                  width: item.snippet.thumbnails.high.width,
                  height: item.snippet.thumbnails.high.height,
                }
              }
            }, {
              upsert: true
            });
          }

          res.status(200);
          res.json({success: true, itemsUpdated: resp.data.items.length});
          res.end();
        }
        else {
          res.status(500);
          res.json({success: false, message: 'No videos returned from YouTube'});
          res.end();
        }
      } else {
        res.status(401);
        res.json({ success: false, message: 'Unauthorized' });
        res.end();
      }
    }
    else {
      res.setHeader('Allow', 'POST');
      res.status(405);
      res.json({ success: false, message: 'Method not allowed' });
      res.end();
    }
  } catch (err) {
    res.status(500);
    res.json({success: false, itemsUpdated: 0});
    res.end();
  }
}