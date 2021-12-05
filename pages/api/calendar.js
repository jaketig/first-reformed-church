import dbConnect from '../../lib/dbConnect'
import CalendarEvent from "../../models/CalendarEvent";
import {withSessionRoute} from "../../lib/auth/IronSessionConfig";

async function CalendarEvents(req, res) {
  //connect to mongo
  await dbConnect();

  try {
    //retrieve announcements
    if (req.method === 'POST') {

      const body = JSON.parse(req.body)

      if (!body.startDate)
        return res.status(400).json({success: false, message: 'startDate is required'})

      if (!body.endDate)
        return res.status(400).json({success: false, message: 'endDate is required'})

      //only return events user has permission to see
      let visibility = ['public']
      if ((req?.session?.roles || []).includes('member'))
        visibility.push('member')

      //get list of events
      const events = await CalendarEvent.find({
        startDate: { $gte: body.startDate},
        $or: [
          {endDate: { $lt: body.endDate }},
          {endDate: { $exists: false }},
          {endDate: null},
        ],

        visibility: { $in: visibility }
      }).lean()

      //handle recurrence
      console.log(events)

      res.json(events)
    }
    else {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err)
    res.status(500);
    return res.json({success: false, message: err.message});
  }
}

export default withSessionRoute(CalendarEvents)