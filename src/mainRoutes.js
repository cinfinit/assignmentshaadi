import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListComp from "../src/demo_1/dashboard";
import LoginComp from "./demo_1/login";

class MainRoutes extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={LoginComp} />
          <Route exact path="/home" component={ListComp} />
        </Switch>
      </>
    );
  }
}

export default MainRoutes;
