import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Login from "./login/Login";
import Signin from "./login/Signin";
import Main from "./main/Main";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      username: null
    };
  }

  changeAuth = (token, username) => {
    this.setState((state) => ({ token: token, username: username }));
  };

  render() {
    return (
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signin">
          <Signin changeAuth={this.changeAuth} />
        </Route>
        <Route path="/">
          {this.state.token !== null ? <Main username={this.state.username} token={this.state.token} /> : <Redirect to="/signin" />}
        </Route>
        {this.state.token !== null ? <Redirect to="/home" /> : ""}
      </Router>
    );
  }
}
