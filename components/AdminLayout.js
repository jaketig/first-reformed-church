import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Badge
} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactsIcon from '@mui/icons-material/Contacts';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import useAuth from "../lib/auth/useAuth";
import fetchJson from "../lib/fetchJson";

export default function AdminLayout ({children}) {
  const router = useRouter()
  const { user } = useAuth({requiredRole: 'admin'})

  const [pendingUsers, setPendingUsers] = useState(0);
  useEffect(() => {
    (async function() {
      const pendingUsers = await fetchJson("/api/account-verification/pending-users", { method: "GET" });
      setPendingUsers(pendingUsers.length)
    })();
  }, []);

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

                <Link href={"/admin/directory"} passHref>
                  <ListItem disablePadding selected={router.pathname === "/admin/directory"}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ContactsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Directory" />
                    </ListItemButton>
                  </ListItem>
                </Link>

                  <Link href={"/admin/account-verification"} passHref>
                    <ListItem disablePadding selected={router.pathname === "/admin/account-verification"}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Badge badgeContent={pendingUsers} color="primary">
                            <VerifiedUserIcon />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText primary="User Verification"/>
                      </ListItemButton>
                    </ListItem>
                  </Link>


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