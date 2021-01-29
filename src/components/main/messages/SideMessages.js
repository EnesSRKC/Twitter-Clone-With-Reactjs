import alertify from "alertifyjs";
import React, { Component } from "react";
import MessageTextBox from "./MessageTextBox";
import io from 'socket.io-client';

const socket = io.connect('https://socialmediaapinodejs.herokuapp.com/');


export default class SideMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: "",
    };
  }

  handleSubmit = () => {
    let methodType = "PATCH";
    if (this.props.messages.length === 0) {
      methodType = "POST";
    }

    if (methodType === "POST") {
      this.createMessage();
    } else if (methodType === "PATCH") {
      this.addMessage();
    }
  };

  createMessage = () => {
    let message = {
      sender: this.props.user.username,
      receiver: this.props.receiver.username,
      message: this.state.messageText,
    };

    socket.emit('chat message', {username: message.sender, message: message.message, date: Date.now() })

    let reqOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify(message),
    };

    fetch(`https://socialmediaapinodejs.herokuapp.com/messages`, reqOptions)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }

        /* this.props.addToSelectedMessages({
          username: message.sender,
          message: message.message,
          date: data.createdMessage.messages[0].date,
        }); */
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  addMessage = () => {
    let message = {
      username: this.props.user.username,
      message: this.state.messageText,
    };

    socket.emit('chat message', ({username: message.username, message: message.message, date: Date.now() }))

    let reqOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify(message),
    };

    fetch(
      `https://socialmediaapinodejs.herokuapp.com/messages/${this.props.messageId}`,
      reqOptions
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }

        /* this.props.addToSelectedMessages(data.addedMessage); */
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  handleChange = (event) => {
    let messageText = event.target.value;
    this.setState(() => ({ messageText: messageText }));
  };

  renderNoMessage = () => {
    return (
      <div id="sidebar-messages-nomessage">
        <h3 class="message-nomessage-header">Seçili bir mesajın yok</h3>
        <p class="message-nomessage-text">
          Mevcut mesajlarından birini seç veya yeni bir mesaja başla.
        </p>
        <button
          class="message-nomessage-btn"
          onClick={() => this.props.handleSearchVisible()}
        >
          Yeni Mesaj
        </button>
      </div>
    );
  };

  renderUserMessages = () => {
    return (
      <div id="sidebar-messages-content-box">
        <div id="sidebar-messages-content-box-header-box">
          <div id="sidebar-messages-content-box-header-box-content">
            <i class="fas fa-calendar-alt"></i>
            Sohbete 28 Kasım 2018 tarihinde başlandı.
          </div>
        </div>

        {this.props.messages.map((message) => {
          return (
            <MessageTextBox
              message={message}
              sender={
                this.props.user.username === message.username ? "right" : "left"
              }
            />
          );
        })}
      </div>
    );
  };

  renderSideHeader = () => {
    return (
      <div id="sidebar-messages-header-box">
        <div id="sidebar-messages-header-user-info-box">
          <button id="sidebar-messages-header-back-btn">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div id="sidebar-messages-header-image-box">
            <img
              src={`https://socialmediaapinodejs.herokuapp.com/${this.props.receiver.userImage}`}
              alt="user"
            />
          </div>
          <div id="sidebar-messages-header-user-username">
            <h3>{this.props.receiver.name}</h3>
            <a href="/profil.html">@{this.props.receiver.username}</a>
          </div>
        </div>
      </div>
    );
  };

  renderInputBox = () => {
    return (
      <div id="sidebar-messages-bottom-box">
        <div id="sidebar-messages-bottom-box-container">
          <div id="sidebar-messages-bottom-box-input-box">
            <input
              type="text"
              placeholder="Bir mesaj yaz"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button
            id="sidebar-messages-bottom-box-send-message-btn"
            onClick={() => this.handleSubmit()}
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  };

  renderMessage = () => {
    if (!this.props.messages) {
      return this.renderNoMessage();
    }

    return this.renderUserMessages();
  };

  render() {
    return (
      <div id="sidebar-messages">
        {this.props.messages === null ? "" : this.renderSideHeader()}
        {this.props.messages === null ? "" : this.renderInputBox()}

        {this.renderMessage()}
      </div>
    );
  }
}
