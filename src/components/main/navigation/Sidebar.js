import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="recommend-box">
          <div className="recommend-box-header">
            <i className="fas fa-fire"></i>Trendler
          </div>
          <ul className="recommend-user-list">
            <li className="recommend-user-list-item">
              <a className="recommend-user-link" href="/konu">
                <div className="recommend-user-trend-text">#Dolar</div>
                <div className="recommend-user-post-count">2.901 Gönderi</div>
              </a>
            </li>
            <li className="recommend-user-list-item">
              <a className="recommend-user-link" href="/konu">
                <div className="recommend-user-trend-text">#ŞiddeteHayır</div>
                <div className="recommend-user-post-count">144.2K Gönderi</div>
              </a>
            </li>
            <li className="recommend-user-list-item">
              <a className="recommend-user-link" href="/konu">
                <div className="recommend-user-trend-text">#DurDe</div>
                <div className="recommend-user-post-count">50.1K Gönderi</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;