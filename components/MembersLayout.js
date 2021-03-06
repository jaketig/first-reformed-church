import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from "@mui/material";
import {useRouter} from 'next/router'
import Link from 'next/link'
import ContactsIcon from '@mui/icons-material/Contacts';
import ChurchIcon from '@mui/icons-material/Church';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useAuth from "../lib/auth/useAuth";

export default function MembersLayout ({children}) {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <Container sx={{height: '100%'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={'auto'} sx={{width: {sm: '250px'} }}>
          <Paper>
            <nav aria-label="main mailbox folders">
              <List>
                <Link href={"/members"} passHref>
                  <ListItem disablePadding selected={router.pathname === '/members'}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ChurchIcon />
                      </ListItemIcon>
                      <ListItemText primary="Members" />
                    </ListItemButton>
                  </ListItem>
                </Link>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Directory" />
                  </ListItemButton>
                </ListItem>

                {user && (user?.roles || []).includes("admin") &&
                  <Link href="/admin" passHref>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin Panel" />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                }
              </List>
            </nav>
          </Paper>
        </Grid>
        <Grid item xs={12} sm sx={{flexGrow: '1!important'}}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}