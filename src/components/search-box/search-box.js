import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <input
        className='search-box'
        name='search'
        type='text'
        onChange={onChange}
        value={value}
      />
    );
  };
};

export default SearchBox;