import React, { useState, useContext, useCallback } from "react";

import { Redirect } from "react-router-dom";

import { Box, Button, TextField } from "@material-ui/core";

import { Layout } from "../organisms/Layout";
import type { AuthenticationRequest } from "../../security/authentication/AuthenticationRequest";
import type { AuthenticationResult } from "../../security/authentication/AuthenticationResult";
import {
  isAdmin,
  isUser,
} from "../../security/authorization/authorizePrincipal";
import { AuthenticatedUser } from "../../security/Principal";
import { ALL_AUTHORITIES } from "../../security/Authority";
import {
  AuthenticationContext,
  AuthenticationFunctionContext,
} from "../../security/AuthenticationProvider";
import { routes } from "../routes/routes";

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
  const [authenticationFailed, setAuthenticationFailed] = useState(false);

  const { principal } = useContext(AuthenticationContext);
  const { login } = useContext(AuthenticationFunctionContext);

  const handleAuthentication = useCallback(
    (authenticationRequest: AuthenticationRequest) => {
      const authenticationResult = mockAuthentication(authenticationRequest);

      if (authenticationResult.isAuthenticated) {
        login(authenticationResult.result);
      } else {
        setAuthenticationFailed(true);
      }
    },
    [login, setAuthenticationFailed]
  );

  if (principal.isAuthenticated) {
    if (isAdmin(principal)) {
      return <Redirect to={routes.admin.path} />;
    } else if (isUser(principal)) {
      return <Redirect to={routes.user.path} />;
    } else {
      throw new Error("unknown user.");
    }
  } else {
    return (
      <Layout>
        <Box>Login Page.</Box>
        {authenticationFailed && <p>Authentication failed!</p>}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAuthentication({ username, password });
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            label="username"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            label="username"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Layout>
    );
  }
};

export { LoginPage };
