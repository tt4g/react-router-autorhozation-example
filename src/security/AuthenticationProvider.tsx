import React, { useState, useCallback } from "react";
import { Principal, AnonymousUser } from "./Principal";

type LoginFunction = (principal: Principal) => void;
type LogoutFunction = () => void;

type AuthenticationFunctions = {
  readonly login: LoginFunction;
  readonly logout: LogoutFunction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
const dummyAuthenticationFunction: (...args: any[]) => void = () => {};

const anonymousUser: AnonymousUser = { isAuthenticated: false };
const AuthenticationContext = React.createContext<Principal>(anonymousUser);
const AuthenticationFunctionContext = React.createContext<
  AuthenticationFunctions
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
    <AuthenticationContext.Provider value={principal}>
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
