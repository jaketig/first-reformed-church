import { useEffect, useState } from 'react';
import useAuth from "../lib/auth/useAuth";
import {Alert, Divider, Paper, Typography} from "@mui/material";
import dayjs from 'dayjs'
import CalendarEvent from "../models/CalendarEvent";
import fetchJson from "../lib/fetchJson";


function Calendar() {

  const { user } = useAuth()

  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(dayjs().year())
  const [month, setMonth] = useState(dayjs().month())
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

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


      console.log(events)

    const numDays = endDate.diff(startDate, 'day')

    const dates = []
    for (let i = 0; i <= numDays; i++) {
      dates.push({
        label: startDate.add(i, 'days').format('ddd D'),
        events: []
      })
    }

    setDays(dates);
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

    </Paper>
  )
}

export default Calendar