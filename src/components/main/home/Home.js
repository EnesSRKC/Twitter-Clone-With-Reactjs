import alertify from "alertifyjs";
import React, {Component } from "react";
import Search from "../navigation/search/Search";
import Post from "./posts/Post";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  addComment = () => {
    this.getPosts();
  };

  getPosts = () => {
    fetch("https://socialmediaapinodejs.herokuapp.com/posts")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data.posts.reverse() }))
      .catch((err) => {
        alertify.error(err.message);
      });
  };

  render() {
    return (
      <div className="main">
        <div className="main-container">
          <Search />
          <div id="main-content">
            {this.state.posts.map((post) => {
              return (
                <Post
                  addComment={this.addComment}
                  postId={post._id}
                  user={this.props.user}
                  token={this.props.token}
                  author={post.author}
                  content={post.content}
                  postImage={post.postImage}
                  likes={post.likes}
                  comments={post.comments}
                  date={post.date}
                  quoUsername={post.quotationUsername}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
