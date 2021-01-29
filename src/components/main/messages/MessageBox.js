import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MessageBox extends Component {


  handleClick = () => {
    this.props.selectMessage(this.props.message);
    this.props.handleActive(this.props.index);
  }

  
  render() {
      let receiver = this.props.user.username === this.props.message.from ? this.props.message.to : this.props.message.from;
      let message_array = this.props.message.messages;


      let lastMessage = {};
      let lastMessageDate = "";
      let h = "";
      let m = "";
      if(message_array.length !== 0){
        lastMessage =  message_array[message_array.length - 1];
        lastMessageDate = lastMessage.date || "";
        let date = new Date(lastMessageDate);
        h = date.getHours();
        m = date.getMinutes();
      }
    return (
      // onclick="messageActiveChange(0)"
      <div className="main-messages-user-container" onClick={() => this.handleClick()}>
        <div className="main-messages-user-box">
          <div className="main-messages-user-img-box">
            <img src="./public/users-images/image4.jpg" alt="user" />
          </div>
          <div className="main-messages-user-info-box">
            <div className="main-messages-user-username">
              <h4>
                {receiver} <Link to={`/profile/${receiver}`}>@{receiver}</Link>
              </h4>
            </div>
            <div className="main-messages-user-last-message">{lastMessage.message}</div>
          </div>
          <div className="main-messages-user-time-box">{h}:{m}</div>
        </div>

        <div className={`main-messages-user-stick ${this.props.activeStick === this.props.index ? "active": ""}`}></div>
      </div>
    );
  }
}
