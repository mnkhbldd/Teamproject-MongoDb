import React, { Dispatch, SetStateAction } from "react";

interface AuthContextValue {
  profile: any;
  bankCard: any;
  handleLogOut: () => void;
}

export const AuthContext = React.createContext<AuthContextValue>({
  profile: null,
  bankCard: null,
  handleLogOut: () => {},
});
