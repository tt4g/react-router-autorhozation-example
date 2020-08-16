import Box from "@material-ui/core/Box";
import React from "react";

import { Helmet } from "react-helmet";

import { Link, useLocation } from "react-router-dom";


import { Layout } from "../organisms/Layout";

import type { PageRoute } from "../routes/routes";

interface AccessDeniedPageProps {
  readonly navigateRoute: PageRoute;
}

const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({
  navigateRoute,
}) => {
  const location = useLocation();

  return (
    <Layout>
      <Helmet>
        <title>Access Denied!</title>
      </Helmet>
      <Box>
        <h3>You cannot access this URL.</h3>
        <p>
          You cannot access to <code>{location.pathname}</code>.
        </p>
        <p>
          <Link to={navigateRoute.path}>Back</Link>
        </p>
      </Box>
    </Layout>
  );
};

export { AccessDeniedPage };
