import React from 'react';

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      className='search-box'
      name='search'
      type='text'
      onChange={(e) => onChange(e.target.value)}
      value={value}
      placeholder='Enter your search'
    />
  );
};

export default SearchBox;