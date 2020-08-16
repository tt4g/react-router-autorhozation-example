import React from "react";

import { Helmet } from "react-helmet";

import Box from "@material-ui/core/Box";

import { Layout } from "../organisms/Layout";

const AdminPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Admin Page</title>
      </Helmet>
      <Box>Admin Page.</Box>
    </Layout>
  );
};

export { AdminPage };
