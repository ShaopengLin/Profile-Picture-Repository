import React from "react";

import Interface from "./config/Interface";

import Login from "./config/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router basename ={process.env.PUBLIC_URL}>
      <div>

        <Route path="/" exact component={Login} />

        <Route path="/Interface" exact component={Interface} />

      </div>
    </Router>
  );
}

export default App;
