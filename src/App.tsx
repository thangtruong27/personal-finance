import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import Appbar from "./components/Appbar";
import Sidebar from "./components/Sidebar";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Appbar />
          <Sidebar />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
