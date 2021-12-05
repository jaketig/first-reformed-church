import { useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import AuthContext from "./AuthContext";

export default function useAuth({ allowAnonymous = false, requireVerification = false} = {}) {
  const {user, mutateUser, logout} = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user || allowAnonymous) return

    if (!user.isLoggedIn)
      router.push('/login');

    if (requireVerification && !(user.roles || []).includes("member"))
      router.push('/pending-verification')

  }, [user, allowAnonymous, requireVerification])

  return { user, mutateUser, logout }
}