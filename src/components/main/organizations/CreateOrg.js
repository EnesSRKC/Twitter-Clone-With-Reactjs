import alertify from "alertifyjs";
import React, { Component } from "react";
import WrappedMap from "./Map";

export default class CreateOrg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      description: "",
      day: 1,
      month: 0,
      year: 2021,
      hour: "",
      min: "",
      coordLng: 0,
      coordLat: 0,
      coordName: "",
      isMarker: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let date = new Date(
      Number(this.state.year),
      Number(this.state.month),
      Number(this.state.day),
      Number(this.state.hour),
      Number(this.state.min)
    );

    let organization = {
      header: this.state.header,
      description: this.state.description,
      userId: this.props.user._id,
      locationName: this.state.coordName,
      lat: this.state.coordLat,
      long: this.state.coordLng,
      date: date,
    };

    let reqOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify(organization),
    };

    fetch(
      `https://socialmediaapinodejs.herokuapp.com/organizations`,
      reqOptions
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }

        this.props.handleCreateShown(false);
        this.props.addToOrganizations(organization);
        alertify.success(data.message);
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
      });
  };

  handleHeaderChange = (event) => {
    this.setState(() => ({ header: event.target.value }));
  };
  handleDescChange = (event) => {
    this.setState(() => ({ description: event.target.value }));
  };
  handleSelectDayChange = (event) => {
    this.setState(() => ({ day: event.target.value }));
  };
  handleSelectMonthChange = (event) => {
    this.setState(() => ({ month: event.target.value }));
  };
  handleSelectYearChange = (event) => {
    this.setState(() => ({ year: event.target.value }));
  };
  handleMapClick = (coord) => {
    this.setState(() => ({
      coordLat: coord.latLng.lat(),
      coordLng: coord.latLng.lng(),
      isMarker: true,
    }));
  };

  handleLocationNameChange = (event) => {
    this.setState(() => ({ coordName: event.target.value }));
  };

  handleTimeChange = (event) => {
    let time = event.target.value.split(":");
    let hour = time[0];
    let min = time[1];
    this.setState(() => ({ hour: hour, min: min }));
  };

  render() {
    var days = [];
    var years = [];

    for (let i = 1; i < 32; i++) {
      days.push(i);
    }
    var currentYear = new Date().getFullYear();
    for (let j = currentYear; j < currentYear + 50; j++) {
      years.push(j);
    }

    return (
      <div id="organization-create">
        <div id="organization-create-container">
          <div id="organization-create-close-box">
            <button onClick={() => this.props.handleCreateShown(false)}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div id="organization-create-box">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name" for="header">
                  Organization Başlığı
                </label>
                <input
                  class="organization-create-form-input"
                  type="text"
                  name="header"
                  onChange={(e) => this.handleHeaderChange(e)}
                />
              </div>
              <div class="organization-create-form-box">
                <label
                  class="organization-create-form-input-name"
                  for="description"
                >
                  Açıklama
                </label>
                <textarea
                  name="description"
                  className="organization-create-form-input"
                  cols="30"
                  rows="10"
                  onChange={(e) => this.handleDescChange(e)}
                ></textarea>
              </div>
              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name" for="day">
                  Gün
                </label>
                <select
                  name="day"
                  class="organization-create-form-input"
                  onChange={(e) => this.handleSelectDayChange(e)}
                >
                  {days.map((day) => {
                    return <option value={day}>{day}</option>;
                  })}
                </select>
              </div>
              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name" for="month">
                  Ay
                </label>
                <select
                  name="month"
                  class="organization-create-form-input"
                  onChange={(e) => this.handleSelectMonthChange(e)}
                >
                  <option value="0">Ocak</option>
                  <option value="1">Şubat</option>
                  <option value="2">Mart</option>
                  <option value="3">Nisan</option>
                  <option value="4">Mayıs</option>
                  <option value="5">Haziran</option>
                  <option value="6">Temmuz</option>
                  <option value="7">Ağustos</option>
                  <option value="8">Eylül</option>
                  <option value="9">Ekim</option>
                  <option value="10">Kasım</option>
                  <option value="11">Aralık</option>
                </select>
              </div>

              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name" for="year">
                  Yıl
                </label>
                <select
                  name="year"
                  class="organization-create-form-input"
                  onChange={(e) => this.handleSelectYearChange(e)}
                >
                  {years.map((year) => {
                    return <option value={year}>{year}</option>;
                  })}
                </select>
              </div>
              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name" for="time">
                  Saat
                </label>
                <input
                  class="organization-create-form-input"
                  type="time"
                  name="time"
                  onChange={(e) => this.handleTimeChange(e)}
                />
              </div>

              <div class="organization-create-form-box">
                <label class="organization-create-form-input-name" for="time">
                  Konum
                </label>
                <div class="organization-map">
                  <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBj61Ukg5eGEO-cK1-3gBqRJm1p53suZPo`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    handleMapClick={this.handleMapClick}
                    isMarker={this.state.isMarker}
                    lat={this.state.coordLat}
                    lng={this.state.coordLng}
                  />
                </div>
              </div>

              <div class="organization-create-form-box">
                <label
                  class="organization-create-form-input-name"
                  for="location-name"
                >
                  Konum Adı
                </label>
                <input
                  class="organization-create-form-input"
                  type="text"
                  name="location-name"
                  onChange={(e) => this.handleLocationNameChange(e)}
                />
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
