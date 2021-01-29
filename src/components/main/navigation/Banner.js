import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    let userImage = "";
    let imgSrc = "";
    if (
      typeof this.state.user.userImage !== undefined &&
      this.state.user.userImage !== null
    ) {
      imgSrc = "https://socialmediaapinodejs.herokuapp.com/" + userImage;
    }
    return (
      <div className="banner">
        <div className="banner-container">
          <ul className="banner-list">
            <li className="banner-list-item" key={0}>
              <Link to="/" className="logo">
                <i className="banner-icon fas fa-snowflake"></i>
              </Link>
            </li>
            <li className="banner-list-item" key={1}>
              <Link
                to="/home"
                className={this.props.routeName === "home" ? "active" : ""}
              >
                <i className="banner-icon fas fa-home"></i>
                <span className="banner-text">Anasayfa</span>
              </Link>
            </li>
            <li className="banner-list-item" key={2}>
              <Link
                to="/explore"
                className={this.props.routeName === "explore" ? "active" : ""}
              >
                <i className="banner-icon fas fa-hashtag"></i>
                <span className="banner-text">Keşfet</span>
              </Link>
            </li>
            <li className="banner-list-item" key={3}>
              <Link
                to="/notifications"
                className={
                  this.props.routeName === "notifications" ? "active" : ""
                }
              >
                <i className="banner-icon fas fa-bell"></i>
                <span className="banner-text">Bildirimler</span>
                <span className="info-count">99+</span>
              </Link>
            </li>
            <li className="banner-list-item" key={4}>
              <Link
                to="/messages"
                className={this.props.routeName === "messages" ? "active" : ""}
              >
                <i className="banner-icon fas fa-envelope"></i>
                <span className="banner-text">Mesajlar</span>
                <span className="info-count">3</span>
              </Link>
            </li>
            <li className="banner-list-item" key={5}>
              <Link
                to="/organizations"
                className={
                  this.props.routeName === "organizations" ? "active" : ""
                }
              >
                <i className="banner-icon fas fa-users"></i>
                <span className="banner-text">Organizasyonlar</span>
                <span className="info-count">3</span>
              </Link>
            </li>
            <li className="banner-list-item" key={6}>
              <Link
                to="/profile"
                className={this.props.routeName === "profile" ? "active" : ""}
              >
                <i className="banner-icon fas fa-user"></i>
                <span className="banner-text">Profil</span>
              </Link>
            </li>
            <li className="banner-list-item" key={7}>
              <Link to="/profile" className="share-post-button">
                Gönderi Paylaş
              </Link>
            </li>
          </ul>

          <div id="main-banner-user-info-box">
            <Link id="main-banner-user-info" to="/profile">
              <div id="main-banner-user-img-box">
                <img src={imgSrc} alt="user" />
              </div>
              <div id="main-banner-user-name-box">
                <div id="main-banner-user-namesurname">
                  {this.state.user.name}
                </div>
                <div id="main-banner-user-username">
                  @{this.state.user.username}
                </div>
              </div>
            </Link>
            <div id="main-banner-user-signout-box">
              <Link to="/signout">Çıkış yap</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
