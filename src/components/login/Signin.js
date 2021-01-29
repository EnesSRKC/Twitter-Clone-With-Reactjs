import React, { Component } from "react";
import SigninInput from "./signin/SigninInput";
import auth from "../security/auth";
import { Link } from "react-router-dom";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };


  }

  handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
    };
    
    auth.signin(user, this.props.changeAuth);
  };


  handleChange = (e, name) => {
    switch (name) {
      case "username":
        this.setState((state) => ({ username: e.target.value }));
        break;
      case "password":
        this.setState((state) => ({ password: e.target.value }));
        break;
      default:
        break;
    }

  };
  render() {
    return (
      <div id="signin-page">
        <div id="signin-page-container">
          <div id="signin-header-container">
            <div id="signin-logo">
              <i className="fas fa-snowflake"></i>
            </div>
            <div id="signin-header-text">Twitter'a Giriş Yap</div>
          </div>

          <div id="signin-form-container">
            <form onSubmit={this.handleSubmit}>
              <SigninInput
                type="text"
                name="username"
                autocomplete="on"
                text="Kullanıcı Adı"
                handleChange={this.handleChange}
              />
              <SigninInput
                type="password"
                name="password"
                autocomplete="off"
                text="Şifre"
                handleChange={this.handleChange}
              />

              <div className="signin-button-box">
                <button type="submit" className="signin-button">
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>

          <div id="signin-link-container">
            <Link to="/forget-password">Şifreni mi unuttun?</Link>
            <span>·</span>
            <Link to="/login">Twitter'a Kaydol</Link>
          </div>
        </div>
      </div>
    );
  }
}
