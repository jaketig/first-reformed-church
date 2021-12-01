import { Container, Button } from '@mui/material'
import { useUser } from '../lib/auth'
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

export default function Members() {
  const router = useRouter();
  const { user, mutateUser } = useUser({
    redirectTo: '/login'
  })

  const handleLogout = async (event) => {
    event.preventDefault();
    mutateUser(
      await fetchJson("/api/auth/logout", { method: "POST" }),
      false,
    );
    router.push("/login");
  }

  return (
    <>
      { user && user.isLoggedIn &&
        <Container>
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