import React, { Component } from "react";
import Banner from "../navigation/Banner";
import Messages from "./Messages";
import SideMessages from "./SideMessages";
import io from "socket.io-client";

const socket = io.connect("https://socialmediaapinodejs.herokuapp.com/");

export default class MessagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleSearch: false,
      messages: [],
      selectedMessages: null,
      selectedUser: {},
      receiver: {},
      messageId: "",
    };
  }

  selectUser = (user) => {
    this.setState(
      () => ({ selectedUser: user }),
      () => {
        this.closeSearch();
        this.addToMessages();
      }
    );
  };

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate() {
    console.log("update çalıştı");
    socket.on("chat message", ({ username, message, date }) => {
      this.addToSelectedMessages({ username, message, date });
    });
  }

  handleSearchVisible = () => {
    this.setState(() => ({ isVisibleSearch: true }));
  };

  closeSearch = () => {
    this.setState(() => ({ isVisibleSearch: false }));
  };

  addToMessages = () => {
    let messageList = this.state.messages;
    messageList.push({
      from: this.props.user.username,
      to: this.state.selectedUser.username,
      messages: [],
    });
    this.setState(() => ({ messages: messageList }));
  };

  getMessages = () => {
    console.log('get message çalıştı')
    fetch(
      `https://socialmediaapinodejs.herokuapp.com/messages/${this.props.user.username}`
    )
      .then((docs) => docs.json())
      .then((data) => this.setState(() => ({ messages: data })));
  };

  selectMessage = (messages) => {
    let receiver =
      this.props.user.username === messages.from ? messages.to : messages.from;
    this.setState(() => ({
      selectedMessages: messages.messages,
      messageId: messages._id,
    }));
    fetch(`https://socialmediaapinodejs.herokuapp.com/users/${receiver}`)
      .then((docs) => docs.json())
      .then((data) => this.setState(() => ({ receiver: data })));
  };

  addToSelectedMessages = (message) => {
    let messages = this.state.selectedMessages;
    messages.push(message);
    this.setState(() => ({ selectedMessages: messages }));
  };

  render() {
    
    return (
      <div className="container-messages">
        <Banner user={this.props.user} routeName="messages" />
        <Messages
          user={this.props.user}
          handleSearchVisible={this.handleSearchVisible}
          closeSearch={this.closeSearch}
          isVisibleSearch={this.state.isVisibleSearch}
          messages={this.state.messages}
          selectMessage={this.selectMessage}
          selectUser={this.selectUser}
        />
        <SideMessages
          handleSearchVisible={this.handleSearchVisible}
          messages={this.state.selectedMessages}
          user={this.props.user}
          receiver={this.state.receiver}
          addToSelectedMessages={this.addToSelectedMessages}
          messageId={this.state.messageId}
          token={this.props.token}
        />
      </div>
    );
  }
}
