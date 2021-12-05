import {
  Alert,
  Typography,
  Grid,
} from '@mui/material'
import useAuth from '../../lib/auth/useAuth'
import MembersLayout from "../../components/MembersLayout";

function Members() {
  const { user } = useAuth()

  return (
    <>
      { user && user.isLoggedIn &&
        <Grid container>
          {!(user.roles || []).includes("member") &&
            <Grid item xs={12}>
              <Alert severity={"warning"}>
                <Typography>
                  <b>Limited Access</b> - You may not access confidential information until your account has been verified.
                </Typography>
              </Alert>
            </Grid>
          }
          <Grid item>
            Members Area
            <p>Hello {user?.name}</p>

            <pre>{JSON.stringify(user, undefined,2)}</pre>
          </Grid>
        </Grid>
      }
    </>
  )
}

Members.Layout = MembersLayout

export default Members