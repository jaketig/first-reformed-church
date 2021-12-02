import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import useSWR from "swr";
import {useEffect} from "react";
import Router from "next/router";

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'frcAuth',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

export function useUser({ requireVerification = false} = {}) {
  const {
    data: user,
    mutate: mutateUser
  } = useSWR('/api/auth/user')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) return

    if (!user.isLoggedIn) {
      Router.push('/login');
    }

    if (requireVerification && !(user.roles || []).includes("member")) {
      Router.push('/pending-verification')
    }

  }, [user, requireVerification])

  return { user, mutateUser }
}
