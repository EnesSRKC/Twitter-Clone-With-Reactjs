import React, { Component } from "react";
import CreateOrg from "./CreateOrg";
import OrganizationBox from "./OrganizationBox";

export default class Organizations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateShown: false,
    };
  }

  handleCreateShown = (isShown) => {
    this.setState(() => ({ isCreateShown: isShown }));
  };

  handleShow = () => {
    this.handleCreateShown(true);
    this.props.handleActiveTab(0);
  };

  renderNoOrganization = () => {
    return (
      <div id="main-organization-noorganizations">
        <div id="main-organization-noorganizations-container">
          <p>
            Organizasyonlar Twitter'daki diğer kullanıcılar ile plan
            oluşturmanızı sağlar. Hemen bir organizasyon ayarla.
          </p>
          <button id="main-organization-noorganizations-create-btn">
            Oluştur
          </button>
        </div>
      </div>
    );
  };

  renderOrganizationArray = () => {
    return this.props.organizations.map((organization) => {
      return (
        <OrganizationBox
          organization={organization}
          handleOrganizationSelect={this.props.handleOrganizationSelect}
          selectedOrganization={this.props.selectedOrganization}
        />
      );
    });
  };

  renderOrganizations = () => {
    if (!this.props.organizations.length) {
      return this.renderNoOrganization();
    }
    return this.renderOrganizationArray();
  };

  render() {
    return (
      <div id="main-organization">
        <div className="organization-header">
          <div className="organization-header-container">
            <h3>Organizasyonlar</h3>
            <button
              className="organization-create-btn"
              title="Oluştur"
              onClick={() => this.handleShow()}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <div id="main-organization-content">
          <div id="organization-search">
            <div id="organization-search-container">
              <i className="fas fa-search"></i>
              <input
                id="main-organization-search-input"
                name="search"
                type="text"
                autoComplete="off"
                placeholder="Ara"
              />
            </div>
          </div>

          {this.renderOrganizations()}
          {/* <div className="main-organization-organizations">
            <div className="main-organization-organizations-container">
              <div className="main-organization-organizations-icon-box">
                <i className="fas fa-user-friends"></i>
              </div>
              <div className="main-organization-organizations-title">
                Tasarım dersi yapılacaklar hakkında toplantıTasarım dersi
                yapılacaklar hakkında toplantı
              </div>
              <div className="main-organization-organizations-date">
                <p>23 Kasım 2020</p>
                <span>20.00</span>
              </div>
            </div>
            <div className="main-organization-stick active"></div>
          </div> */}
        </div>

        {this.state.isCreateShown && (
          <CreateOrg
            user={this.props.user}
            token={this.props.token}
            handleCreateShown={this.handleCreateShown}
            addToOrganizations={this.props.addToOrganizations}
          />
        )}
      </div>
    );
  }
}
