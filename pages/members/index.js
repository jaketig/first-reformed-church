import useAuth from '../../lib/auth/useAuth'
import MembersLayout from "../../components/MembersLayout";
import Calendar from "../../components/Calendar";
import Announcements from "../../components/Announcements";
import {Grid} from "@mui/material";

function Members() {
  const { user } = useAuth()

  return (
    <>
      { user && user.isLoggedIn &&
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Calendar/>
          </Grid>
          <Grid item xs={12}>
            <Announcements/>
          </Grid>
        </Grid>
      }
    </>
  )
}

Members.Layout = MembersLayout

export default Members