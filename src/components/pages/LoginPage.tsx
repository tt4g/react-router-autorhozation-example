import React, { useState, useContext, useCallback } from "react";

import { Box, Button, TextField } from "@material-ui/core";

import { Layout } from "../organisms/Layout";

import type { AuthenticationRequest } from "../../security/authentication/AuthenticationRequest";
import type { AuthenticationResult } from "../../security/authentication/AuthenticationResult";
import { AuthenticatedUser } from "../../security/Principal";
import { ALL_AUTHORITIES } from "../../security/Authority";
import { AuthenticationFunctionContext } from "../../security/AuthenticationProvider";

const mockAuthentication: (
  authenticationRequest: AuthenticationRequest
) => AuthenticationResult = (authenticationRequest) => {
  if (
    authenticationRequest.username == "admin" &&
    authenticationRequest.password == "admin"
  ) {
    const adminPrincipal: AuthenticatedUser = {
      isAuthenticated: true,
      identity: authenticationRequest.username,
      roles: ["ADMIN"],
      authorities: [...ALL_AUTHORITIES],
    };
    return { isAuthenticated: true, result: adminPrincipal };
  }

  if (
    authenticationRequest.username == "user" &&
    authenticationRequest.password == "user"
  ) {
    const userPrincipal: AuthenticatedUser = {
      isAuthenticated: true,
      identity: authenticationRequest.username,
      roles: ["USER"],
      authorities: ["CREATE", "EDIT"],
    };

    return { isAuthenticated: true, result: userPrincipal };
  }

  return { isAuthenticated: false };
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthenticationFunctionContext);

  const handleAuthentication = useCallback(
    (authenticationRequest: AuthenticationRequest) => {
      const authenticationResult = mockAuthentication(authenticationRequest);

      if (authenticationResult.isAuthenticated) {
        login(authenticationResult.result);
      }
    },
    [login]
  );

  return (
    <Layout>
      <Box>Login Page.</Box>
      <form onSubmit={() => handleAuthentication({ username, password })}>
        <TextField
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  );
};

export { LoginPage };
