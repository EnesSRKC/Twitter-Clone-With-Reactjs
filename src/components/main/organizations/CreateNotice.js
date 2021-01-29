import alertify from "alertifyjs";
import React, { Component } from "react";

export default class CreateNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      content: "",
    };
  }

  handleHeaderChange = (event) => {
    this.setState(() => ({ header: event.target.value }));
  };

  handleContentChange = (event) => {
    this.setState(() => ({ content: event.target.value }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let announcement = {
      header: this.state.header,
      content: this.state.content,
    };

    let reqOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(announcement),
    };

    fetch(
      `https://socialmediaapinodejs.herokuapp.com/organizations/${this.props.selectedOrganization._id}`,
      reqOptions
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }

        alertify.success(data.message);
        this.props.changeCreateNoticeVisible(false);
        this.props.addToAnnouncements({
            ...announcement,
            date: Date.now()
        });
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  render() {
    return (
      <div id="create-notice-page">
        <div id="create-notice-container">
          <div id="create-notice-box">
            <div id="create-notice-close-box">
              <button
                onClick={() => this.props.changeCreateNoticeVisible(false)}
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form
              id="create-notice-form"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name">
                  Duyuru başlığı
                </label>
                <input
                  onChange={(e) => this.handleHeaderChange(e)}
                  class="organization-create-form-input"
                  type="text"
                />
              </div>
              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name">
                  İçerik
                </label>
                <textarea
                  onChange={(e) => this.handleContentChange(e)}
                  class="organization-create-form-input"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div class="organization-create-form-box">
                <button class="organization-create-button" type="submit">
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
