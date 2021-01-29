import React, { Component } from "react";
import Search from "../navigation/search/Search";
import NotifElement from "./notifs/NotifElement";

export default class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabButton: 0,
      notifications: this.props.user.notifications
    };
  }

  notifTabChange = (tabIndex) => {
    this.setState(() => ({ tabButton: tabIndex }));
  };

  render() {
    console.log(this.state.notifications);
    return (
      <div className="main">
        <div className="main-container">
          <Search />

          <div id="main-content">
            <section id="notification-section">
              <div id="notification-header-box">
                <div
                  className={`notification-header ${
                    this.state.tabButton === 0
                      ? "notification-header-active"
                      : ""
                  }`}
                  onClick={() => this.notifTabChange(0)}
                >
                  Tümü
                </div>
                <div
                  className={`notification-header ${
                    this.state.tabButton === 1
                      ? "notification-header-active"
                      : ""
                  }`}
                  onClick={() => this.notifTabChange(1)}
                >
                  Bahsedenler
                </div>
              </div>

              {this.state.tabButton === 0}

              <div className="notification-tab" style={this.state.tabButton === 0 ? {display: "block"} : {display:"none"}}>
                {this.state.notifications.map((notif, index, arr) => {
                  <NotifElement
                    header={notif.header}
                    text={notif.text}
                    index={index}
                  />;
                })}

                {/* <div class="notification-container notification-unread">
                  <div class="notification-image-box">
                    <img src="./public/users-images/image3.jpg" alt="img" />
                  </div>
                  <div class="notification-content-box">
                    <div class="notification-content-header">
                      <div class="notification-content-header-text">
                        TRT Haber adlı kullanıcının gönderisini kaçırdıysan
                      </div>
                      <div class="notification-content-header-settings">
                        <button
                          class="notification-settings-button"
                          onclick="notifSettingsToggle(event, 3)"
                        >
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div class="notification-settings-collapse">
                          <ul class="notification-settings-list">
                            <li class="notification-settings-list-item">
                              <a href="/delete">Bildirimi sil</a>
                            </li>
                            <li class="notification-settings-list-item">
                              <a href="/delete">Okundu olarak işaretle</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="notification-content-text">
                      #SONDAKİKA "Mehmetçik, Rusya ile kurulacak ortak merkezde
                      ve bu merkezin icra edeceği faaliyetlerde 1 yıl süre ile
                      görev yapacaktır." Milli Savunma Bakanlığından Azerbaycan
                      tezkeresiyle ilgili açıklama.
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="notification-tab" style={this.state.tabButton === 1 ? {display: "block"} : {display:"none"}}>
                {/* <div class="notification-container notification-unread">
                  <div class="notification-image-box">
                    <img src="./public/users-images/image3.jpg" alt="img" />
                  </div>
                  <div class="notification-content-box">
                    <div class="notification-content-header">
                      <div class="notification-content-header-text">
                        TRT Haber adlı kullanıcı bir gönderide senden bahsetti
                      </div>
                      <div class="notification-content-header-settings">
                        <button
                          class="notification-settings-button"
                          onclick="notifSettingsToggle(event, 4)"
                        >
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div class="notification-settings-collapse">
                          <ul class="notification-settings-list">
                            <li class="notification-settings-list-item">
                              <a href="/delete">Bildirimi sil</a>
                            </li>
                            <li class="notification-settings-list-item">
                              <a href="/delete">Okundu olarak işaretle</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="notification-content-text">
                      #SONDAKİKA "Mehmetçik, Rusya ile kurulacak ortak merkezde
                      ve bu merkezin icra edeceği faaliyetlerde @k.ruiz25 1 yıl
                      süre ile görev yapacaktır." Milli Savunma Bakanlığından
                      Azerbaycan tezkeresiyle ilgili açıklama.
                    </div>
                  </div>
                </div> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
