import React from "react";

const Search = () => {

  return (
    <div className="search-box">
      <div className="search-input-box">
        <input
          id="search-input"
          type="text"
          name="search"
          placeholder="Ara"
          autoComplete="off"
        />
        <a href="?s=sdf">
          <i className="fas fa-search"></i>
        </a>
        {/* <SearchList compTypes={compTypes} handleFocus={handleFocus} /> */}
      </div>
    </div>
  );
};

export default Search;
