import React, { Component } from "react";
import Banner from "./navigation/Banner";
import Sidebar from "./navigation/Sidebar";
import Home from "./home/Home";
import Explore from "./explore/Explore";
import Notifications from "./notifications/Notifications";
import Profile from "./profile/Profile";

import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import MessagesContainer from "./messages/MessagesContainer";
import OrganizationContainer from "./organizations/OrganizationContainer";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch(`https://socialmediaapinodejs.herokuapp.com/users/${this.props.username}`)
      .then((res) => res.json())
      .then((data) => this.setState({ user: data }));
  };

  render() {
    return (
      <Router>
        <div className="page">
          <Switch>
            <Route path="/explore">
              <div className="container">
                <Banner user={this.state.user} routeName="explore" />

                <Explore />
                <Sidebar />
              </div>
            </Route>
            <Route path="/notifications">
              <div className="container">
                <Banner user={this.state.user} routeName="notifications" />
                <Notifications user={this.state.user} />
                <Sidebar />
              </div>
            </Route>
            <Route path="/messages">
              <MessagesContainer
                user={this.state.user}
                token={this.props.token}
              />
            </Route>
            <Route path="/organizations">
              <OrganizationContainer
                user={this.state.user}
                token={this.props.token}
              />
            </Route>
            <Route path="/profile">
              <div className="container">
                <Banner user={this.state.user} routeName="profile" />
                <Profile
                  username={this.state.user.username}
                  token={this.props.token}
                />
                <Sidebar />
              </div>
            </Route>
            <Route path="/">
              <div className="container">
                <Banner user={this.state.user} routeName="home" />
                <Home user={this.state.user} token={this.props.token} />
                <Sidebar />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
