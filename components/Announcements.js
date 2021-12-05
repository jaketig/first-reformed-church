import useAuth from "../lib/auth/useAuth";
import {Alert, Divider, Paper, Typography} from "@mui/material";

function Announcements() {

  const { user } = useAuth()

  return (
    <Paper sx={{padding: '10px'}}>
      <Typography variant="h5">Announcements</Typography>
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

export default Announcements