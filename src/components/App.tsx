import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../css/material-ui-base.css";

import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { routes } from "./routes/routes";
import { ScrollToTop } from "./routes/ScrollToTop";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routes.login.path}>
        <LoginPage />
      </Route>
      <Route path={routes.admin.path}>
        <AdminPage />
      </Route>
      <Route path={routes.user.path}>
        <UserPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

ReactDOM.render(
  <BrowserRouter basename="/">
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
