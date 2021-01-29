import alertify from "alertifyjs";
import React, { Component } from "react";
import { Link } from "react-router-dom";
/* 
{
  author,
  content,
  likes,
  comments,
  date,
  quoUsername,
  postImage,
  username
}
 */
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      likes: this.props.likes,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let comment = {
      username: this.props.user.username,
      comment: this.state.comment,
      likes: [],
    };

    let reqOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify(comment),
    };

    fetch(
      `https://socialmediaapinodejs.herokuapp.com/posts/${this.props.postId}`,
      reqOptions
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }

        this.props.addComment();
        alertify.success(data.message);
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  handleChange = (event) => {
    this.setState(() => ({
      comment: event.target.value,
    }));
  };
  quoRender = () => {
    return (
      <div class="post-quotation-info">
        <i class="fas fa-level-down-alt"></i>Şuradan alıntı:
        <Link to={`/profile/${this.props.quoUsername}`}>
          @{this.props.quoUsername}
        </Link>
      </div>
    );
  };

  imageRender = () => {
    return (
      <div className="post-image">
        <img src={this.props.postImage} alt="post-img" />
      </div>
    );
  };

  handleLikeBtnClick = () => {
    /*Veri tabanına push işlemi*/

    let reqOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({ likedUserId: this.props.user._id }),
    };
    fetch(
      `https://socialmediaapinodejs.herokuapp.com/posts/${this.props.postId}`,
      reqOptions
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });

    /*State beğeni değişimi*/
    let likes = this.state.likes;
    likes.push({
      userId: this.props.user._id,
      username: this.props.user.username,
    });
    this.setState(() => ({ likes: likes }));
  };

  handleUnLikeBtnClick = () => {
    /*Veri tabanı pull işlemi*/

    let reqOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({ userIdToDelete: this.props.user._id }),
    };
    fetch(
      `https://socialmediaapinodejs.herokuapp.com/posts/${this.props.postId}`,
      reqOptions
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });

    /*State beğeni değişimi*/
    let likes = this.state.likes.filter(
      (e) => e.userId !== this.props.user._id
    );
    this.setState(() => ({ likes: likes }));
  };

  render() {
    let wasLiked = this.state.likes.find(
      (e) => e.userId === this.props.user._id
    );
    console.log(wasLiked);

    return (
      <div className="post-container">
        <div className="post-info">
          <div className="author-box">
            <div className="author-img">
              <img
                src={`https://socialmediaapinodejs.herokuapp.com/${this.props.author.userImage}`}
                alt="user"
              />
            </div>
          </div>
          <div className="post-box">
            {this.props.quoUsername && this.quoRender()}

            <div className="author-info">
              <div className="author-header">
                <span className="author-name">{this.props.author.name}</span>
                <a className="author-username" href="/user">
                  @{this.props.author.username}
                </a>
              </div>
              <div className="post-settings">
                <button className="settings-button">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
            <div className="post-content">{this.props.content}</div>
            {this.props.postImage && this.imageRender()}
          </div>
        </div>

        <div className="post-tools">
          <div className="post-tools-like-count">
            {this.state.likes.length} beğenme
          </div>
          <div className="post-tools-container">
            <button
              onClick={() =>
                wasLiked
                  ? this.handleUnLikeBtnClick()
                  : this.handleLikeBtnClick()
              }
            >
              <i className={`${wasLiked ? "fas" : "far"} fa-heart`}></i>
            </button>
            <button>
              <i className="far fa-comment"></i>
            </button>
            <button>
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <div className="comments">
          <div className="comments-continue">
            <a href="/">{this.props.comments.length} yorumun tümünü gör</a>
          </div>

          {this.props.comments.map((comment) => {
            return (
              <div className="comment">
                <div>
                  <Link
                    to={`/profile/${comment.username}`}
                    className="comment-username"
                  >
                    {comment.username}
                  </Link>
                  {comment.comment}
                </div>
                <button>
                  <i className="far fa-heart"></i>
                </button>
              </div>
            );
          })}
        </div>
        <div className="post-date">
          <div className="post-date-text">{this.props.date}</div>
        </div>
        <div className="add-comment">
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <textarea
              name="comment"
              cols="30"
              rows="3"
              placeholder="Yorum yap"
              onChange={this.handleChange}
            ></textarea>
            <button
              className="add-comment-button"
              type="submit"
              disabled={this.state.comment.length !== 0 ? false : true}
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    );
  }
}
