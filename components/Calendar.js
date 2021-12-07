import { useEffect, useState } from 'react';
import useAuth from "../lib/auth/useAuth";
import {Alert, Box, Divider, Grid, IconButton, Paper, Typography} from "@mui/material";
import dayjs from 'dayjs'
import fetchJson from "../lib/fetchJson";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function EventLabel({event}) {
  let additionalStyles = {};
  let EventPrefix = ({event}) => <></>;

  if (event.type === 'service') {
    additionalStyles = {
      ...additionalStyles,
      backgroundColor: '#1976d2'
    }
    EventPrefix = ({event}) => <>{dayjs(event.date).format('hA')}: </>
  }
  else if (event.type === 'birthday') {
    additionalStyles = {
      ...additionalStyles,
      backgroundColor: '#ed6c02'
    }
  }
  else if (event.type === 'anniversary') {
    additionalStyles = {
      ...additionalStyles,
      backgroundColor: '#9c27b0'
    }
  }
  else {
    additionalStyles = {
      ...additionalStyles,
      backgroundColor: '#4caf50'
    }
    EventPrefix = ({event}) => <>{dayjs(event.date).format('hA')}: </>
  }

  return (
    <Box sx={{
      borderRadius: '2px',
      color: "#fff",
      marginY: '2px',
      padding: '2px 4px',
      ...additionalStyles
    }}>
      <Typography variant={"body2"}><EventPrefix event={event}/>{event.name}</Typography>
    </Box>
  )
}

function CalendarDay({day, month}) {
  const darken = day.date.month() !== month ? { backgroundColor: '#ccc' } : {}

  return (
    <Paper variant="outlined" square sx={{padding: '5px', minWidth: '150px', height: '200px', ...darken }}>
      <Typography variant={"button"}>{day.date.format('ddd D')}</Typography>

      {day.events.map((event) =>
        <EventLabel key={event._id} event={event}/>
      )}
    </Paper>
  )
}

function CalendarRow({days, month}) {
  return (
    <Grid container wrap="nowrap">
      {(days || []).map((day) =>
        <Grid key={day.id} item xs>
          <CalendarDay day={day} month={month}/>
        </Grid>
      )}
    </Grid>
  )
};

function CalendarControls({year, month, onChange}) {
  const handleIncrease = () => {
    onChange(1)
  }

  const handleDecrease = () => {
    onChange(-1)
  }

  return (
    <Box component={"div"} sx={{display: 'flex', alignItems: 'center', justifyContent: {xs: 'center', md: 'none'}}}>
      <IconButton aria-label="decrease" onClick={handleDecrease}>
        <ArrowLeftIcon />
      </IconButton>
      <Typography variant={"h5"} sx={{minWidth: '180px', textAlign: 'center'}}>{dayjs(new Date(year, month, 1)).format('MMMM YYYY')}</Typography>
      <IconButton aria-label="increase" onClick={handleIncrease}>
        <ArrowRightIcon />
      </IconButton>
    </Box>
  )
}

function Calendar() {

  const { user } = useAuth()

  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(dayjs().year())
  const [month, setMonth] = useState(dayjs().month())

  const [days, setDays] = useState();

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
        id: i,
        date: date,
        events: events.filter(e => date.isSame(dayjs(e.date),'day'))
      })
    }

    const rows = []
    while (dates.length > 0)
      rows.push(dates.splice(0, 7));


    setDays(rows);
    setLoading(false);
  }

  function handleMonthChanged(inc) {
    const newDate = dayjs(new Date(year, month, 1)).add(inc,'months')
    setMonth(newDate.month())
    setYear(newDate.year())
  }

  useEffect(() => {
    (async () => {
      await initCalendar();
    })();
  }, [month, year])

  return (
    <Paper sx={{padding: '10px'}}>
      <Grid container sx={{justifyContent: { md: 'space-between' }}}>
        <Grid item xs={"12"} md={"auto"}>
          <Typography component={"div"} variant="h5">Church Calendar</Typography>
        </Grid>
        <Grid item xs={"12"} md={"auto"}>
          <CalendarControls month={month} year={year} onChange={handleMonthChanged} />
        </Grid>
      </Grid>

      <Divider sx={{marginBottom: '10px'}} />

      {!(user.roles || []).includes("member") &&
      <Alert severity={"warning"} sx={{marginBottom: '10px'}}>
        <Typography>
          <b>Limited Access</b> - You will not be able to view private calendar events until your account has been verified.
        </Typography>
      </Alert>
      }

      <Box display="block" sx={{overflow: 'auto'}}>
        {(days || []).map((row, idx) =>
          <CalendarRow key={idx} days={row} month={month}/>
        )}
      </Box>
    </Paper>
  )
}

export default Calendar