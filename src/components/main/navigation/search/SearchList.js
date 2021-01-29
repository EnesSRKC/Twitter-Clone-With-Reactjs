import React from "react";

const SearchList = (props) => {
  return (
    <ul id="search-list" className="search-result-list" onFocus={props.handleFocus(props.compTypes.compList)}>
      <li>
        <button className="search-user-button">
          <div className="search-user-image">
            <img src="./public/users-images/image1.jpg" alt="resim1" />
          </div>
          <div className="search-user-info">
            <div className="search-name">Katya Ruiz</div>
            <div className="search-username">@kruiz25</div>
          </div>
        </button>
      </li>
      <li>
        <button className="search-user-button">
          <div className="search-user-image">
            <img src="./public/users-images/image2.jpg" alt="resim2" />
          </div>
          <div className="search-user-info">
            <div className="search-name">Katya Ruiz</div>
            <div className="search-username">@kruiz25</div>
          </div>
        </button>
      </li>
      <li>
        <button className="search-user-button">
          <div className="search-user-image">
            <img src="./public/users-images/image3.jpg" alt="resim3" />
          </div>
          <div className="search-user-info">
            <div className="search-name">Katya Ruiz</div>
            <div className="search-username">@kruiz25</div>
          </div>
        </button>
      </li>
      <li>
        <button className="search-user-button">
          <div className="search-user-image">
            <img src="./public/users-images/image3.jpg" />
          </div>
          <div className="search-user-info">
            <div className="search-name">Katya Ruiz</div>
            <div className="search-username">@kruiz25</div>
          </div>
        </button>
      </li>
      <li>
        <button className="search-user-button">
          <div className="search-user-image">
            <img src="./public/users-images/image3.jpg" />
          </div>
          <div className="search-user-info">
            <div className="search-name">Katya Ruiz</div>
            <div className="search-username">@kruiz25</div>
          </div>
        </button>
      </li>
      <li>
        <button className="search-user-button">
          <div className="search-user-image">
            <img src="./public/users-images/image3.jpg" />
          </div>
          <div className="search-user-info">
            <div className="search-name">Katya Ruiz</div>
            <div className="search-username">@kruiz25</div>
          </div>
        </button>
      </li>
    </ul>
  );
};

export default SearchList;
