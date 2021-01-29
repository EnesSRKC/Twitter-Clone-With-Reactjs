import React, { Component } from "react";
import { Link } from "react-router-dom";
import WrappedMap from "./Map";
import SearchUser from "../messages/search/SearchUser";
import alertify from "alertifyjs";
import CreateNotice from "./CreateNotice";

export default class SideOrganizations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateNoticeVisible: false,
    };
  }

  changeCreateNoticeVisible = (visibleState) => {
    this.setState(() => ({ isCreateNoticeVisible: visibleState }));
  };

  handleMapClick = (coord) => {
    console.log(coord.latLng.lat());
  };

  handleAddParticipants = (user) => {
    let reqOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({ userId: user._id }),
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
        this.props.changeSearchVisible(false);
        this.props.addToParticipants(user);
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  closeSearch = () => {
    this.props.changeSearchVisible(false)
  }

  renderTabContentOne = (checkOwner) => {
    return (
      <div className="sidebar-organization-tabcontent">
        <div id="sidebar-organization-participants-container">
          {checkOwner && (
            <div id="add-participant-btn-box">
              <button
                id="add-participant-btn"
                onClick={() => this.props.changeSearchVisible(true)}
              >
                <i class="fas fa-plus"></i>Katılımcı ekle
              </button>
            </div>
          )}

          <table id="sidebar-organization-participants-list">
            <tr>
              <th></th>
              <th colspan="2">İsim</th>
            </tr>
            {this.props.selectedOrganization.participants.map(
              (participant, index, arr) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{participant.name}</td>
                    <td>
                      <Link to={`/profile/${participant.username}`}>
                        @{participant.username}
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </table>
        </div>
      </div>
    );
  };

  renderTabContentTwo = () => {
    return (
      <div className="sidebar-organization-tabcontent">
        <div id="sidebar-organization-map-container">
          <div className="organization-map">
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBj61Ukg5eGEO-cK1-3gBqRJm1p53suZPo`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              handleMapClick={this.handleMapClick}
              isMarker={true}
              lat={this.props.selectedOrganization.location.lat}
              lng={this.props.selectedOrganization.location.long}
            />
          </div>
        </div>
      </div>
    );
  };

  renderTabContentThree = (checkOwner) => {
    return (
      <div className="sidebar-organization-tabcontent">
        <div id="sidebar-organization-notice-container">
          {checkOwner && (
            <div id="add-notice-btn-box">
              <button
                id="add-notice-btn"
                onClick={() => this.changeCreateNoticeVisible(true)}
              >
                <i class="fas fa-plus"></i>Duyuru ekle
              </button>
            </div>
          )}

          {this.props.selectedOrganization.announcements.map((announcement) => {
            return (
              <div className="sidebar-organization-notice-box">
                <h4 className="organization-notice-header">
                  {announcement.header}
                </h4>
                <p>
                  {announcement.content}
                </p>
                <div className="organization-notice-time">
                  <small>{new Date(announcement.date).toLocaleDateString()} {new Date(announcement.date).toLocaleTimeString()}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  renderDescriptionSection = () => {
    let dateOrg = this.props.selectedOrganization.date;
    let date = new Date(dateOrg);

    let min = date.getMinutes();
    min = min < 10 ? min.toString() + "0" : min;

    let day = date.getDate();
    day = day < 10 ? "0" + day.toString() : day;

    let month = date.getMonth();
    month = month < 10 ? "0" + month.toString() : month;

    return (
      <div id="sidebar-organization-description">
        <strong>Organizasyon Başlığı : </strong>
        <span>{this.props.selectedOrganization.header}</span>
        <br />
        <strong>Oluşturan : </strong>
        <span>
          {this.props.selectedOrganization.owner.name} [
          <Link
            to={`/profile/${this.props.username}`}
            title="profili görüntüle"
          >
            @{this.props.selectedOrganization.owner.username}
          </Link>
          ]
        </span>
        <br />
        <strong>Konum Adı : </strong>
        <span>{this.props.selectedOrganization.location.name}</span>
        <br />
        <strong>Organizasyon Zamanı : </strong>
        <span>
          {day} / {month} / {date.getFullYear()} {date.getHours()}:{min}
        </span>
        <br />
        <strong>Açıklama : </strong>
        <span>{this.props.selectedOrganization.description}</span>
      </div>
    );
  };

  render() {
    let isRender = false;
    let checkOwner = false;
    let owner = {};

    if (this.props.selectedOrganization !== null) {
      if (this.props.selectedOrganization.hasOwnProperty("owner")) {
        owner = this.props.selectedOrganization.owner;
        isRender = true;
      }
    }

    if (owner.username !== undefined) {
      if (owner.username === this.props.user.username) {
        checkOwner = true;
      }
    }

    return (
      <div id="sidebar-organization">
        <div className="organization-header">
          <div className="organization-header-container">
            <button id="sidebar-messages-header-back-btn">
              <i className="fas fa-arrow-left"></i>
            </button>
            {this.props.selectedOrganization && (
              <h3>{isRender && this.props.selectedOrganization.header}</h3>
            )}
          </div>
        </div>
        <div id="sidebar-organization-content-box">
          {isRender && this.renderDescriptionSection()}
          {isRender && (
            <div id="sidebar-organization-tabs-header-box">
              <button
                className={`profile-main-tablinks ${
                  this.props.activeTab === 0 ? "active" : ""
                }`}
                onClick={() => this.props.handleActiveTab(0)}
              >
                Katılımcılar{" "}
                <span>
                  | {this.props.selectedOrganization.participants.length}
                </span>
              </button>
              <button
                className={`profile-main-tablinks ${
                  this.props.activeTab === 1 ? "active" : ""
                }`}
                onClick={() => this.props.handleActiveTab(1)}
              >
                Konum
              </button>
              <button
                className={`profile-main-tablinks ${
                  this.props.activeTab === 2 ? "active" : ""
                }`}
                onClick={() => this.props.handleActiveTab(2)}
              >
                Duyurular <span>| {this.props.selectedOrganization.announcements.length}</span>
              </button>
            </div>
          )}

          {isRender && this.props.activeTab === 0
            ? this.renderTabContentOne(checkOwner)
            : ""}
          {isRender && this.props.activeTab === 1
            ? this.renderTabContentTwo()
            : ""}
          {isRender && this.props.activeTab === 2
            ? this.renderTabContentThree(checkOwner)
            : ""}

          {this.props.isSearchVisible && (
            <SearchUser closeSearch={this.closeSearch} handleAddParticipants={this.handleAddParticipants} />
          )}

          {this.state.isCreateNoticeVisible && (
            <CreateNotice
              selectedOrganization={this.props.selectedOrganization}
              addToAnnouncements={this.props.addToAnnouncements}
              changeCreateNoticeVisible={this.changeCreateNoticeVisible}
            />
          )}
        </div>
      </div>
    );
  }
}
