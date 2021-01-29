import React, { Component } from "react";

export default class MessageTextBox extends Component {
  

  render() {
      let date = this.props.message.date;
      let d = new Date(date);
      let h = d.getHours();
      let m = d.getMinutes();
    return (
      <div className={`sidebar-messages-content-box-message-container ${this.props.sender}`}>
        <div className="sidebar-messages-content-box-message-box">{this.props.message.message}</div>
        <div className="send-time">{h}:{m}</div>
      </div>
    );
  }
}
