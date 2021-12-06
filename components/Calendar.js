import { useEffect, useState } from 'react';
import useAuth from "../lib/auth/useAuth";
import {Alert, Box, Divider, Grid, Paper, Typography} from "@mui/material";
import dayjs from 'dayjs'
import fetchJson from "../lib/fetchJson";

function CalendarRow({days}) {

  return (
    <Grid container wrap="nowrap">
      {(days || []).map((day) =>
        <Grid item xs>
          <Paper key={day.label} variant="outlined" square sx={{padding: '5px', minWidth: '150px', height: '200px'}}>
            {day.label}
          </Paper>
        </Grid>
      )}
    </Grid>
  )
};

function Calendar() {

  const { user } = useAuth()

  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(dayjs().year())
  const [month, setMonth] = useState(dayjs().month())

  const [days, setDays] = useState();


  const today = dayjs().date()

  async function initCalendar() {
    setLoading(true);
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day()
    const lastDayOfMonth = dayjs(new Date(year, month, 1)).endOf('month').day()
    const startDate = dayjs(new Date(year, month, 1)).subtract(firstDayOfMonth, 'day')
    const endDate = dayjs(new Date(year, month, 1)).endOf('month').add(6 - lastDayOfMonth, 'day')

    const events = await fetchJson("/api/calendar", {
      method: "POST",

      body: JSON.stringify({
        startDate: startDate.toDate(),
        endDate: endDate.toDate()
      })
    });
    const numDays = endDate.diff(startDate, 'day')

    const dates = []
    for (let i = 0; i <= numDays; i++) {
      const date = startDate.add(i, 'days');
      dates.push({
        label: date.format('ddd D'),
        events: events.filter(e => date.isSame(dayjs(e.date),'day'))
      })
    }

    const rows = []
    while (dates.length > 0)
      rows.push(dates.splice(0, 7));


    setDays(rows);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await initCalendar();
    })();
  }, [month, year])

  // useEffect(() => {
  //   fetchCalendarData();
  // }, [])

  return (
    <Paper sx={{padding: '10px'}}>
      <Typography variant="h5">Church Calendar</Typography>
      <Divider sx={{marginBottom: '10px'}} />

      {!(user.roles || []).includes("member") &&
      <Alert severity={"warning"}>
        <Typography>
          <b>Limited Access</b> - You may not access confidential information until your account has been verified.
        </Typography>
      </Alert>
      }

      <Box display="block" sx={{overflow: 'auto'}}>
        {(days || []).map((row, idx) =>
          <CalendarRow key={idx}  days={row}/>
        )}
      </Box>




      {/*{(days || []).map((day) =>*/}
      {/*  <div key={day.label}>*/}
      {/*    <p>{day.label}</p>*/}
      {/*    {(day.events || []).map((event) =>*/}
      {/*      <p key={event._id}>{event.name} - {event.date}</p>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*)}*/}

    </Paper>
  )
}

export default Calendar