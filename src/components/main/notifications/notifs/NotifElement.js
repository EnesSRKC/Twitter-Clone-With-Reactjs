import React, { Component } from "react";

export default class NotifElement extends Component {



  notifSettingsToggle = (notifIndex) => {
    var settingsBoxes = document.getElementsByClassName(
      "notification-settings-collapse"
    );
    settingsBoxes[notifIndex].classList.toggle("settings-active");
  };

  render() {
    return (
      <div className="notification-container">
        <div className="notification-image-box">
          <img src="./public/users-images/image3.jpg" alt="img" />
        </div>
        <div className="notification-content-box">
          <div className="notification-content-header">
            <div className="notification-content-header-text">
              {this.props.header}
            </div>
            <div className="notification-content-header-settings">
              <button
                className="notification-settings-button"
                onClick={this.notifSettingsToggle(this.props.index)}
              >
                <i className="fas fa-ellipsis-h"></i>
              </button>
              <div className="notification-settings-collapse">
                <ul className="notification-settings-list">
                  <li className="notification-settings-list-item">
                    <a href="/delete">Bildirimi sil</a>
                  </li>
                  <li className="notification-settings-list-item">
                    <a href="/delete">Okundu olarak işaretle</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="notification-content-text">{this.props.text}</div>
        </div>
      </div>
    );
  }
}
