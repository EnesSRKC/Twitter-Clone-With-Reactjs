import React, { Component } from "react";
import MessageBox from "./MessageBox";
import SearchUser from "./search/SearchUser";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStick: -1,
    };
  }

  renderNoMessage = () => {
    return (
      <div id="main-messages-nomessage">
        <h3 className="message-nomessage-header">Mesaj Gönder</h3>
        <p className="message-nomessage-text">
          Direkt Mesajlar, sen ve Twitter'daki diğer kişiler arasında
          gerçekleşen özel sohbetlerdir. Tweetleri, medyaları ve daha fazlasını
          paylaşabilirsin!
        </p>
        <button
          className="message-nomessage-btn"
          onClick={() => this.props.handleSearchVisible()}
        >
          Sohbet Başlat
        </button>
      </div>
    );
  };

  handleActive = (stickIndex) => {
    this.setState(() => ({ activeStick: stickIndex }));
  };

  render() {
    return (
      <div id="main-messages">
        <div id="main-messages-header-box">
          <div id="main-messages-header">
            <h3>Mesajlar</h3>
            <button
              id="create-message-btn"
              onClick={this.props.handleSearchVisible}
            >
              <i className="fas fa-comment-medical"></i>
            </button>
          </div>
        </div>

        <div id="main-messages-search-box">
          <div id="main-messages-search">
            <i id="main-messages-search-icon" className="fas fa-search"></i>
            <input
              id="main-messages-search-input"
              name="search"
              type="text"
              autocomplete="off"
              placeholder="Kişi ara"
            />
          </div>
        </div>

        {/* <!--Mesaj Yoksa-->
              <!--
                <div id="main-messages-nomessage">
                  <h3 className="message-nomessage-header">Mesaj Gönder</h3>
                  <p className="message-nomessage-text">Direkt Mesajlar, sen ve Twitter'daki diğer kişiler arasında gerçekleşen özel sohbetlerdir. Tweetleri, medyaları ve daha fazlasını paylaşabilirsin!</p>
                  <button className="message-nomessage-btn">Sohbet Başlat</button>
                </div>
              --> */}

        {this.props.messages.length === 0 ? this.renderNoMessage() : ""}
        {this.props.messages.map((message, index, arr) => {
          return (
            <MessageBox
              message={message}
              user={this.props.user}
              selectMessage={this.props.selectMessage}
              handleActive={this.handleActive}
              activeStick={this.state.activeStick}
              index={index}
            />
          );
        })}
        {/* <div
          className="main-messages-user-container"
          onclick="messageActiveChange(0)"
        >
          <div className="main-messages-user-box">
            <div className="main-messages-user-img-box">
              <img src="./public/users-images/image4.jpg" alt="user-image" />
            </div>
            <div className="main-messages-user-info-box">
              <div className="main-messages-user-username">
                <h4>
                  Katya Ruiz <a href="/profil.html">@k.ruiz25</a>
                </h4>
              </div>
              <div className="main-messages-user-last-message">Selam</div>
            </div>
            <div className="main-messages-user-time-box">5dk</div>
          </div>

          <div className="main-messages-user-stick"></div>
        </div>

        <div
          className="main-messages-user-container"
          onclick="messageActiveChange(1)"
        >
          <div className="main-messages-user-box">
            <div className="main-messages-user-img-box">
              <img src="./public/users-images/image4.jpg" alt="user-image" />
            </div>
            <div className="main-messages-user-info-box">
              <div className="main-messages-user-username">
                <h4>
                  Enes Sirkecioğlu
                  <a href="/profil.html">@enes.sirkeciogluuuuuuuu</a>
                </h4>
              </div>
              <div className="main-messages-user-last-message">
                SelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelam
              </div>
            </div>
            <div className="main-messages-user-time-box">5dk</div>
          </div>

          <div className="main-messages-user-stick"></div>
        </div>

        <div
          className="main-messages-user-container"
          onclick="messageActiveChange(2)"
        >
          <div className="main-messages-user-box">
            <div className="main-messages-user-img-box">
              <img src="./public/users-images/image4.jpg" alt="user-image" />
            </div>
            <div className="main-messages-user-info-box">
              <div className="main-messages-user-username">
                <h4>
                  Enes Sirkecioğlu
                  <a href="/profil.html">@enes.sirkeciogluuuuuuuu</a>
                </h4>
              </div>
              <div className="main-messages-user-last-message">
                SelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelam
              </div>
            </div>
            <div className="main-messages-user-time-box">5dk</div>
          </div>

          <div className="main-messages-user-stick"></div>
        </div>

        <div
          className="main-messages-user-container"
          onclick="messageActiveChange(3)"
        >
          <div className="main-messages-user-box">
            <div className="main-messages-user-img-box">
              <img src="./public/users-images/image4.jpg" alt="user-image" />
            </div>
            <div className="main-messages-user-info-box">
              <div className="main-messages-user-username">
                <h4>
                  Enes Sirkecioğlu
                  <a href="/profil.html">@enes.sirkeciogluuuuuuuu</a>
                </h4>
              </div>
              <div className="main-messages-user-last-message">
                SelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelam
              </div>
            </div>
            <div className="main-messages-user-time-box">5dk</div>
          </div>

          <div className="main-messages-user-stick"></div>
        </div> */}

        {this.props.isVisibleSearch && (
          <SearchUser
            selectUser={this.props.selectUser}
            closeSearch={this.props.closeSearch}
          />
        )}
      </div>
    );
  }
}
