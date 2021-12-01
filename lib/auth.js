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

export function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const {
    data: user,
    mutate: mutateUser
  } = useSWR('/api/auth/user')

  useEffect(() => {
    console.log(redirectTo,redirectIfFound, user)

    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
