import React from "react";
import ReactDOM from "react-dom";

import { Helmet } from "react-helmet";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../css/material-ui-base.css";

import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { routes } from "./routes/routes";
import { ScrollToTop } from "./routes/ScrollToTop";
import { AuthenticationProvider } from "../security/AuthenticationProvider";
import { AdminOnly, UserOnly } from "../security/RequiredAuthorized";
import { AccessDeniedPage } from "./pages/AccessDeniedPage";

const App: React.FC = () => {
  return (
    <AuthenticationProvider>
      <Helmet
        encodeSpecialCharacters
        titleTemplate="%s - React Router authorization example"
        defaultTitle="App"
        defer={false}
      >
        <html lang="en" />
      </Helmet>
      <Switch>
        <Route exact path={routes.login.path}>
          <LoginPage />
        </Route>
        <Route path={routes.admin.path}>
          <AdminOnly
            FallbackComponent={() => (
              <AccessDeniedPage navigateRoute={routes.login} />
            )}
          >
            <AdminPage />
          </AdminOnly>
        </Route>
        <Route path={routes.user.path}>
          <UserOnly
            FallbackComponent={() => (
              <AccessDeniedPage navigateRoute={routes.login} />
            )}
          >
            <UserPage />
          </UserOnly>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </AuthenticationProvider>
  );
};

ReactDOM.render(
  <BrowserRouter basename="/">
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
