import alertify from "alertifyjs";
import React, { Component } from "react";
import Search from "../navigation/search/Search";
import Tag from "./tags/Tag";

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    this.getTags();
  }

  getTags = () => {
    fetch("https://socialmediaapinodejs.herokuapp.com/tags")
      .then((res) => res.json())
      .then((data) => this.setState(() => ({ tags: data.tags })))
      .catch((err) => alertify.error(err));
  };

  render() {
    return (
      <div class="main">
        <div class="main-container">
          <Search />
          <div id="main-content">
            <div id="explore-header">Gündemdeki etiketler</div>

            {this.state.tags.map(tag => {
                return (
                    <Tag text={tag.text} />
                ) 
            })}

            <button class="explore-item" id="explore-more-button">
              Daha fazla göster
            </button>
          </div>
        </div>
      </div>
    );
  }
}
