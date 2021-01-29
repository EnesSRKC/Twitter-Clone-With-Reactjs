import alertify from "alertifyjs";
import React, { Component } from "react";
import UserBox from "./UserBox";

export default class SearchUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
          users: []
        }
    }

    handleChange = (e) => {
      let text = e.target.value;
      this.getUsers(text)
    }

    getUsers = (text) => {
      fetch(`https://socialmediaapinodejs.herokuapp.com/users/search?q=${text}&l=8`)
      .then((res) => res.json())
      .then((data) => this.setState({ users: data }))
      .catch((err) => {
        alertify.error(err.message);
      });
    }

    

  render() {
    return (
      <div id="main-create-messages">
        <div id="main-create-messages-container">
          <div id="main-crate-messages-close-box">
            <button id="create-messages-close-btn" onClick={this.props.closeSearch}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div id="main-create-messages-box">
            <div id="main-create-messages-search-container">
              <i class="fas fa-search"></i>
              <input type="text" name="search" placeholder="Kullanıcı ara" autoComplete="off" onChange={(e) => this.handleChange(e)}/>
            </div>
          </div>
          <ul id="messages-user-search-list">
            {this.state.users.map(user => {
              return (
                <UserBox user={user} selectUser={this.props.selectUser} handleAddParticipants={this.props.handleAddParticipants}/>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
