import Box from "@material-ui/core/Box";
import React from "react";

import { Helmet } from "react-helmet";


import { Layout } from "../organisms/Layout";

const UserPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>User Page</title>
      </Helmet>
      <Box>User Page.</Box>
    </Layout>
  );
};

export { UserPage };
