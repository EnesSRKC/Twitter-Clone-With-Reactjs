import React, { Component } from "react";

export default class UserBox extends Component {


    handleClick = () => {

      if(this.props.handleAddParticipants){
        this.props.handleAddParticipants(this.props.user)
      } else {
        this.props.selectUser(this.props.user)
      }
    }

  render() {
    return (
      <li key={this.props.user.username} class="messages-user-search-list-item" onClick={() => this.handleClick()}>
        <div class="messages-search-list-user-image">
          <img src={`https://socialmediaapinodejs.herokuapp.com/${this.props.user.userImage}`} alt="img" />
        </div>
        <div class="messages-search-list-user-info-box">
          <h4>{this.props.user.name}</h4>
          <p>@{this.props.user.username}</p>
        </div>
      </li>
    );
  }
}
