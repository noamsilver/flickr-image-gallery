import React, { Component } from 'react';
import SearchBox from '../../components/search-box';
import debounce from '../../utils/debounce';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChangeDebounced = debounce(this.props.handleChange, 300);
  };


  handleChange = (e) => {
    console.log('in SearchBar handleChange');
    const value = e.target.value;
    this.setState({value});
    this.handleChangeDebounced(value);
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
  };
};

export default SearchBar;