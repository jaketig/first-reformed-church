import dbConnect from '../../lib/dbConnect'
import CalendarEvent from "../../models/CalendarEvent";
import {withSessionRoute} from "../../lib/auth/IronSessionConfig";
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

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
      if ((req?.session?.user?.roles || []).includes('member'))
        visibility.push('member')

      //get list of events
      const events = await CalendarEvent.find({
        $or: [
          {startDate: { $gte: body.startDate}},
          { $or: [
            {endDate: { $lt: body.endDate }},
            {endDate: { $exists: false }},
            {endDate: null},
          ]}
        ],

        visibility: { $in: visibility }
      }).lean()

      const occurrences = []

      events.map((event) => {

        if (event?.recurrence) {
          const eventStartDate = dayjs(event.startDate);
          const calendarStartDate = dayjs(body.startDate);
          const calendarEndDate = dayjs(body.endDate);

          const diff = calendarStartDate.diff(eventStartDate, event.recurrence.interval) % event.recurrence.numIntervals
          let curr = diff > 0 ? dayjs(event.startDate).add(diff, event.recurrence.interval) : dayjs(event.startDate)

          while (!curr.isAfter(calendarEndDate, event.recurrence.interval)) {
            const newEvent = {...event, date: curr.toDate()};
            delete newEvent.startDate;
            delete newEvent.endDate;

            occurrences.push(newEvent)

            curr = curr.add(event.recurrence.numIntervals, event.recurrence.interval)
          }

        } else {
          event.date = event.startDate;
          delete event.startDate;
          delete event.endDate;

          occurrences.push(event)
        }

      })

      res.json(occurrences)
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