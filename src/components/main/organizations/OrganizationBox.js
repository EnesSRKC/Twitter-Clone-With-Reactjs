import React, { Component } from "react";

export default class OrganizationBox extends Component {

  render() {
    let dateOrg = this.props.organization.date;
    let date = new Date(dateOrg);

    let min = date.getMinutes();
    min = min < 10 ? min.toString() + "0" : min;

    let day = date.getDate();
    day = day < 10 ? "0" + day.toString() : day;

    let month = date.getMonth();
    month = month < 10 ? "0" + month.toString() : month;

    return (
      <div
        className="main-organization-organizations"
        onClick={() =>
          this.props.handleOrganizationSelect(this.props.organization)
        }
      >
        <div className="main-organization-organizations-container">
          <div className="main-organization-organizations-icon-box">
            <i className="fas fa-user-friends"></i>
          </div>
          <div className="main-organization-organizations-title">
            {this.props.organization.header}
          </div>
          <div className="main-organization-organizations-date">
            <p>
              {day}/{month}/{date.getFullYear()}
            </p>
            <span>
              {date.getHours()}.{min}
            </span>
          </div>
        </div>
        <div className={`main-organization-stick`}></div>
      </div>
    );
  }
}
