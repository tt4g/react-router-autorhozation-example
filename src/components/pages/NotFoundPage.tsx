import React from "react";

import { Helmet } from "react-helmet";

import { Link, useLocation } from "react-router-dom";

import Box from "@material-ui/core/Box";

import { Layout } from "../organisms/Layout";
import { routes } from "../routes/routes";

const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <Helmet>
        <title>Not Found!</title>
      </Helmet>
      <Box>
        <h3>Not Found!</h3>
        <p>
          <code>{location.pathname}</code> not found!
        </p>
        <p>
          <Link to={routes.login.path}>Go to Login Page.</Link>
        </p>
      </Box>
    </Layout>
  );
};

export { NotFoundPage };
