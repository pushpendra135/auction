 
import React, { Component } from "react";
import UserPage from "./UserPage";
import login from "./login";
import add from "./add";
import teamlogin from "./teamlogin";
import playerauction from "./playerauction";
import serverauction from "./serverauction";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>This is the home page</p>
          </Route>
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={login} />
          <Route path="/add/:addCode" component={add} />
          <Route path="/teamlogin" component={teamlogin} />
          <Route path="/playerauction/:teamCode" component={playerauction} />
          <Route path="/serverauction/:addCode" component={serverauction} />
        </Switch>
      </Router>
    );
  }
}