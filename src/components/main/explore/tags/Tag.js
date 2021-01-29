import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Tag extends Component {

  render() {
    return (
      <Link className="explore-item" to="/kesfet">
        <div className="explore-item-text">#{this.props.text}</div>
        <div className="explore-item-count">15,2K Gönderi</div>
      </Link>
    );
  }
}
