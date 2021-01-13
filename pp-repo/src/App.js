import React from "react";
import ReactDOM from "react-dom";
import { Button, Input, InputLabel, InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Interface from "./pp/Interface";
import NavBar from "./pp/NavBar";
import Login from "./pp/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import fire from "./fire";
import CurrentUser from "./pp/CurrentUser";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  return (
    <Router>
      <div>

        <Route path="/" exact component={Login} />

        <Route path="/Interface" exact component={Interface} />

      </div>
    </Router>
  );
}

export default App;
