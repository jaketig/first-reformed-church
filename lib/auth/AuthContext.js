import React from "react";

const AuthContext = React.createContext({
  user: undefined,
  mutateUser: async () => null,
  logout: async () => null
});

export default AuthContext