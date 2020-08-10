import React from "react";
import Container from "@material-ui/core/Container";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="md">
      <main>{children}</main>
    </Container>
  );
};

export { Layout };
