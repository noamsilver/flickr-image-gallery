import React, { Component } from 'react';
import SearchBox from '../../components/search-box'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.props.handleChange(value);
    this.setState({value})
  }

  render() {
    console.log('in SearchBar render');
    return (
      <div className='search-bar'>
        <SearchBox
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
};

export default SearchBar;