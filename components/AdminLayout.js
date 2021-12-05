import {
  Container,
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
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactsIcon from '@mui/icons-material/Contacts';
import ChurchIcon from '@mui/icons-material/Church';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useAuth from "../lib/auth/useAuth";

export default function AdminLayout ({children}) {
  const router = useRouter()
  const { user } = useAuth({requiredRole: 'admin'})

  return (
    <Container sx={{height: '100%'}}>
      <Grid container spacing={2}>
        <Grid item width={250}>
          <Paper>
            <nav aria-label="main mailbox folders">
              <List>
                <Link href={"/admin/announcements"} passHref>
                  <ListItem disablePadding selected={router.pathname === "/admin/announcements"}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CampaignIcon />
                      </ListItemIcon>
                      <ListItemText primary="Announcements" />
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
        <Grid item>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}