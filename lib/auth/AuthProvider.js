import React from 'react';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import AuthContext from './AuthContext';
import fetchJson from "../fetchJson";

export function AuthProvider({children}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/auth/user');
  const router = useRouter();

  async function logout ({redirectTo = null} = {}) {
    await mutateUser(
      await fetchJson("/api/auth/logout", { method: "POST" }),
      false,
    );

    if(redirectTo)
      await router.push(redirectTo)
  };

  return (
    <AuthContext.Provider value={{ user, mutateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}