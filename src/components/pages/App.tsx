import React from "react";
import ReactDOM from "react-dom";

import "../../css/material-ui-base.css";
import Button from "@material-ui/core/Button";

const App: React.FC = () => {
  return (
    <main>
      <Button variant="contained" color="primary">
        Hello! React Router authorization routing!
      </Button>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
