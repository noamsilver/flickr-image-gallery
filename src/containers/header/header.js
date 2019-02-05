import React from 'react';
import SearchBar from '../search-bar';

const Header= ({ handleSearch, resultsPanelClicked, resetRsultsPanelClick, events, error }) => (
  <div
    id='header'
    onClick={(e) => {e.stopPropagation()}}
  >
    <h1>Flickr Photo Gallery</h1>
    <SearchBar
      handleChange={handleSearch}
      resultsPanelClicked={resultsPanelClicked}
      resetRsultsPanelClick={resetRsultsPanelClick}
      events={events}
    />
    {error && <div className='fetch-error'>We encountered an error: {error}</div>}
  </div>
);

export default Header;