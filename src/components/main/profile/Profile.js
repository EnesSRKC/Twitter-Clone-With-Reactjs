import alertify from "alertifyjs";
import React, { Component } from "react";
import Search from "../navigation/search/Search";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      content: ""
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch(`https://socialmediaapinodejs.herokuapp.com/users/${this.props.username}`)
      .then((res) => res.json())
      .then((data) => this.setState({ user: data }));
  };

  handleShareSubmit = (event) => {
    event.preventDefault();

    let post = {
      userId: this.state.user._id,
      content: this.state.content,
    };

    let reqOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify(post),
    };

    fetch("https://socialmediaapinodejs.herokuapp.com/posts/", reqOptions)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }
        
        alertify.success(data.message);
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  handleShareTextChange = (event) => {
    this.setState((state) => ({
      content: event.target.value,
    }));
  };
  render() {
    return (
      <div className="main">
        <div className="main-container">
          <Search />

          <div id="main-content">
            <div id="profile-main-user-box">
              <div id="profile-main-user-template">
                <div id="profile-main-user-template-user-image-box">
                  <img
                    src="./public/users-images/image1.jpg"
                    alt="resim1"
                  />
                </div>
              </div>
              <div id="profile-main-user-info-box">
                <div id="profile-main-user-info-box-container">
                  <div id="profile-main-user-info-tools">
                    <button id="profile-main-follow-btn">Takip Et</button>
                    <button id="profile-main-unfollow-btn">
                      Takibi Bırak..
                    </button>
                  </div>
                  <div id="profile-main-user-info-namesurname">
                    {this.state.user.name}
                  </div>
                  <div id="profile-main-user-info-username">
                    @{this.state.user.username}
                  </div>
                  <div id="profile-main-user-info-biography">
                    Türkiye Cumhuriyeti Sağlık Bakanı - Minister of Health of
                    the Republic of Turkey
                  </div>
                  <div id="profile-main-user-info-location">
                    <i className="fas fa-map-marker-alt"></i>Ankara, Türkiye
                  </div>
                  <div id="profile-main-user-info-follower-info">
                    <span className="profile-main-user-following">
                      <span className="profile-main-user-following-count">
                        27
                      </span>
                      <span className="profile-main-user-following-text">
                        takip
                      </span>
                    </span>
                    <span className="profile-main-user-following">
                      <span className="profile-main-user-following-count">
                        3.4M
                      </span>
                      <span className="profile-main-user-following-text">
                        takipçi
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div id="profile-main-tabs">
              <button
                className="profile-main-tablinks active"
                onclick="profileTabs(event, 0)"
              >
                Gönderiler
              </button>
              <button
                className="profile-main-tablinks"
                onclick="profileTabs(event, 1)"
              >
                Alıntılar
              </button>
              <button
                className="profile-main-tablinks"
                onclick="profileTabs(event, 2)"
              >
                Beğenilenler
              </button>
              <button className="profile-main-tablinks">Gönderi Paylaş</button>
            </div>

            <div className="profile-main-tabcontent"></div>

            <div
              className="profile-main-tabcontent"
              style={{ display: "none" }}
            >
              <div className="post-container">
                <div className="post-info">
                  <div className="author-box">
                    <div className="author-img">
                      <img src="./public/users-images/image1.jpg" />
                    </div>
                  </div>
                  <div className="post-box">
                    <div className="post-quotation-info">
                      <i className="fas fa-level-down-alt"></i>Şuradan alıntı:
                      <a href="#">@ATV Haber</a>
                    </div>
                    <div className="author-info">
                      <div className="author-header">
                        <span className="author-name">TRT Haber</span>
                        <a className="author-username" href="#">
                          @trthaber
                        </a>
                      </div>
                      <div className="post-settings">
                        <button className="settings-button">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                    </div>
                    <div className="post-content">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Deserunt, assumenda quisquam molestias esse minima odit,
                      iure dolor explicabo debitis corrupti inventore ipsa
                      tempora id fugit ut porro, omnis earum eius.
                    </div>
                  </div>
                </div>

                <div className="post-tools">
                  <div className="post-tools-like-count">234 beğenme</div>
                  <div className="post-tools-container">
                    <button>
                      <i className="fas fa-heart"></i>
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
                    <a href="#">35 yorumun tümünü gör</a>
                  </div>
                  <div className="comment">
                    <div>
                      <button className="comment-username">kruz25</button>Çok
                      başarılı olmuş ..
                    </div>
                    <button>
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <div className="comment">
                    <div>
                      <button className="comment-username">hayd.ro</button>Evet
                      gerçekten çok başarılı
                    </div>
                    <button>
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="post-date">
                  <div className="post-date-text">22 saat önce</div>
                </div>
                <div className="add-comment">
                  <form autoComplete="off">
                    <textarea
                      name="comment"
                      cols="30"
                      rows="3"
                      placeholder="Yorum yap"
                    ></textarea>
                    <button
                      className="add-comment-button"
                      type="submit"
                      disabled
                    >
                      Gönder
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div
              className="profile-main-tabcontent"
              style={{ display: "none" }}
            >
              <div className="post-container">
                <div className="post-info">
                  <div className="author-box">
                    <div className="author-img">
                      <img src="./public/users-images/image1.jpg" />
                    </div>
                  </div>
                  <div className="post-box">
                    <div className="post-quotation-info">
                      <i className="fas fa-level-down-alt"></i>Şuradan alıntı:
                      <a href="#">@ATV Haber</a>
                    </div>
                    <div className="author-info">
                      <div className="author-header">
                        <span className="author-name">TRT Haber</span>
                        <a className="author-username" href="#">
                          @trthaber
                        </a>
                      </div>
                      <div className="post-settings">
                        <button className="settings-button">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                    </div>
                    <div className="post-content">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Deserunt, assumenda quisquam molestias esse minima odit,
                      iure dolor explicabo debitis corrupti inventore ipsa
                      tempora id fugit ut porro, omnis earum eius.
                    </div>
                  </div>
                </div>

                <div className="post-tools">
                  <div className="post-tools-like-count">234 beğenme</div>
                  <div className="post-tools-container">
                    <button>
                      <i className="fas fa-heart"></i>
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
                    <a href="#">35 yorumun tümünü gör</a>
                  </div>
                  <div className="comment">
                    <div>
                      <button className="comment-username">kruz25</button>Çok
                      başarılı olmuş ..
                    </div>
                    <button>
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <div className="comment">
                    <div>
                      <button className="comment-username">hayd.ro</button>Evet
                      gerçekten çok başarılı
                    </div>
                    <button>
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="post-date">
                  <div className="post-date-text">22 saat önce</div>
                </div>
                <div className="add-comment">
                  <form action="" autocomplete="off">
                    <textarea
                      name="comment"
                      cols="30"
                      rows="3"
                      placeholder="Yorum yap"
                    ></textarea>
                    <button
                      className="add-comment-button"
                      type="submit"
                      disabled
                    >
                      Gönder
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div
              className="profile-main-tabcontent"
              style={{ display: "block" }}
            >
              <div id="profile-share-post-container">
                <div id="profile-share-post-box">
                  <form onSubmit={this.handleShareSubmit} autoComplete="false">
                    <div className="share-post-form-container">
                      <textarea
                        name="content"
                        className="share-post-textarea"
                        onChange={this.handleShareTextChange}
                      ></textarea>
                    </div>
                    <div className="share-post-form-container">
                      <input
                        name="postImage"
                        className="share-post-inputfile"
                        type="file"
                      />
                    </div>
                    <div className="share-post-form-container share-btn">
                      <button type="submit">Paylaş</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
