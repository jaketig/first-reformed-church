import {Container, Button, Alert, Typography} from '@mui/material'
import { useUser } from '../lib/auth'
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

export default function Members() {
  const router = useRouter();
  const { user, mutateUser } = useUser()

  const handleLogout = async (event) => {
    event.preventDefault();
    await mutateUser(
      await fetchJson("/api/auth/logout", { method: "POST" }),
      false,
    );
    await router.push("/login");
  }

  return (
    <>
      { user && user.isLoggedIn &&
        <Container>

          {  !(user.roles || []).includes("member") &&
            <Alert severity={"warning"}>
              <Typography>
                <b>Limited Access</b> - You may not access confidential information until your account has been verified.
              </Typography>
            </Alert>
          }

          Members Area
          <pre>{JSON.stringify(user, undefined,2)}</pre>

          <p>Hello {user?.email}</p>

          <Button onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      }
    </>
  )
}