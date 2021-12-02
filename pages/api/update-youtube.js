import {youtube} from "@googleapis/youtube"
import Video from '../../models/video'
import dbConnect from '../../lib/dbConnect'

// this is called by a CRON job on a raspberry pi
// #!/bin/bash
// # RUN THIS ON A CRON SCHEDULE
// # */5 09-11 * * *  => 9-11 am = 180 minutes => every 5 min => 7200 quota (2 calls)
// # 0 08,12-20 * * *  8am-8pm = 720 minutes => every 1 hour => 2400 quota (2 calls)
// curl  --request POST --url 'https://first-reformed-church.vercel.app/api/update-youtube' --header 'Authorization: Bearer {{API_SECRET_KEY}}'

export default async function UpdateYoutube(req, res) {
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

        // get current live video
        let resp = await client.search.list({
          part: 'snippet',
          channelId: process.env.YOUTUBE_CHANNEL_ID,
          maxResults: 1,
          type: 'video',
          eventType: 'live'
        })

        // get last 5 videos
        if (!resp?.data?.items || resp?.data?.items?.length == 0) {
          resp = await client.search.list({
            part: 'snippet',
            channelId: process.env.YOUTUBE_CHANNEL_ID,
            type: 'video',
            order: 'date'
          })
        }

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

          return res.status(200).json({success: true, itemsUpdated: resp.data.items.length});
        }
        else {
          return res.status(500).json({success: false, message: 'No videos returned from YouTube'});

        }
      } else {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    }
    else {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500);
    return res.json({success: false, itemsUpdated: 0});
  }
}