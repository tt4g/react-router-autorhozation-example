import React, { useState, useCallback } from "react";
import { Principal, AnonymousUser } from "./Principal";

type AuthenticationContextState = {
  readonly principal: Principal;
};

const anonymousUser: AnonymousUser = { isAuthenticated: false };
const AuthenticationContext = React.createContext<AuthenticationContextState>({
  principal: anonymousUser,
});

type LoginFunction = (principal: Principal) => void;
type LogoutFunction = () => void;

type AuthenticationFunctionContextState = {
  readonly login: LoginFunction;
  readonly logout: LogoutFunction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
const dummyAuthenticationFunction: (...args: any[]) => void = () => {};

const AuthenticationFunctionContext = React.createContext<
  AuthenticationFunctionContextState
>({ login: dummyAuthenticationFunction, logout: dummyAuthenticationFunction });

const AuthenticationProvider: React.FC = ({ children }) => {
  const [principal, setPrincipal] = useState<Principal>(anonymousUser);

  const login: LoginFunction = useCallback(
    (principal: Principal) => {
      setPrincipal(principal);
    },
    [setPrincipal]
  );
  const logout: LogoutFunction = useCallback(() => {
    setPrincipal(anonymousUser);
  }, [setPrincipal]);

  return (
    <AuthenticationContext.Provider value={{ principal }}>
      <AuthenticationFunctionContext.Provider value={{ login, logout }}>
        {children}
      </AuthenticationFunctionContext.Provider>
    </AuthenticationContext.Provider>
  );
};

export {
  AuthenticationContext,
  AuthenticationFunctionContext,
  AuthenticationProvider,
};
