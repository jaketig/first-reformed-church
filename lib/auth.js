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

export function useUser({ allowAnonymous = false, requireVerification = false} = {}) {
  const {
    data: user,
    mutate: mutateUser
  } = useSWR('/api/auth/user')

  useEffect(() => {
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user || allowAnonymous) return

    if (!user.isLoggedIn)
      Router.push('/login');

    if (requireVerification && !(user.roles || []).includes("member"))
      Router.push('/pending-verification')

  }, [user, allowAnonymous, requireVerification])

  return { user, mutateUser }
}
