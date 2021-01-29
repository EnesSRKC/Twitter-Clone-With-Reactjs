import alertify from "alertifyjs";
import React, { Component } from "react";
import Banner from "../navigation/Banner";
import Organizations from "./Organizations";
import SideOrganizations from "./SideOrganizations";

export default class OrganizationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      organizations: [],
      selectedOrganization: {},
      isSearchVisible: false,
    };
  }

  componentDidMount() {
    this.getOrganizations();
  }

  changeSearchVisible = (visibleState) => {
    this.setState(() => ({ isSearchVisible: visibleState }));
  };

  handleActiveTab = (tabIndex) => {
    this.setState(() => ({ activeTab: tabIndex }));
  };

  getOrganizations = () => {
    fetch(`https://socialmediaapinodejs.herokuapp.com/organizations/${this.props.user._id}`)
      .then((res) => res.json())
      .then((data) => this.setState(() => ({ organizations: data })))
      .catch((err) => alertify.error(err));
  };

  handleOrganizationSelect = (organization) => {
    this.setState(() => ({ selectedOrganization: organization }));
  };

  addToParticipants = (user) => {
    let organization = this.state.selectedOrganization;
    organization.participants.push(user);
    this.setState(() => ({ selectedOrganization: organization }));
  };

  addToOrganizations = (organization) => {
    let organizations = this.state.organizations;
    organizations.push(organization);
    this.setState(() => ({ organizations: organizations }));
  }

  addToAnnouncements = (announcement) => {
    let organization = this.state.selectedOrganization;
    organization.announcements.push(announcement);
    this.setState(() => ({ selectedOrganization: organization }));
  };

  render() {
    return (
      <div className="container-organization">
        <Banner user={this.props.user} routeName="organizations" />

        <Organizations
          user={this.props.user}
          token={this.props.token}
          handleActiveTab={this.handleActiveTab}
          organizations={this.state.organizations}
          handleOrganizationSelect={this.handleOrganizationSelect}
          selectedOrganization={this.state.selectedOrganization}
          addToOrganizations={this.addToOrganizations}
        />

        <SideOrganizations
          user={this.props.user}
          activeTab={this.state.activeTab}
          handleActiveTab={this.handleActiveTab}
          selectedOrganization={this.state.selectedOrganization}
          changeSearchVisible={this.changeSearchVisible}
          isSearchVisible={this.state.isSearchVisible}
          addToParticipants={this.addToParticipants}
          addToAnnouncements={this.addToAnnouncements}
        />
      </div>
    );
  }
}
