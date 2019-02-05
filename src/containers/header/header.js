import React from 'react';
import SearchBar from '../search-bar';

const Header= ({ handleSearchChange, resultsPanelClicked, resetRsultsPanelClick, events }) => (
  <div
    id='header'
    onClick={(e) => {e.stopPropagation()}}
  >
    <h1>Flickr Photo Gallery</h1>
    <SearchBar
      handleChange={handleSearchChange}
      resultsPanelClicked={resultsPanelClicked}
      resetRsultsPanelClick={resetRsultsPanelClick}
      events={events}
    />
  </div>
);

export default Header;