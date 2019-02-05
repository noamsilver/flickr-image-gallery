import React, { Component } from 'react';
import SearchBox from '../../components/search-box';
import debounce from '../../utils/debounce';
import SaveButton from '../../components/save-button';
import SavedSearchesDropdown from '../../components/saved-searches-dropdown';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      savedSearches: window.localStorage.getItem('savedSearches') ? this.getSavedSearches() : [],
      showDropdown: false,
    };

    this.handleChangeDebounced = debounce(this.props.handleChange, 500);
    props.events.on('galleryClick', this.hideSavedSearchesDropdown)
  };

  getSavedSearches = () => (
    JSON.parse(window.localStorage.getItem('savedSearches'))
  );

  saveSearch = () => {
    const { savedSearches, value } = this.state;
    if (value !== '' && !savedSearches.find(savedValue => savedValue === value)) {
      savedSearches.unshift(value);
      window.localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
      this.setState(() => ({
        savedSearches,
      }));
    };
    this.setState(() => ({
      showDropdown: true,
    }));
  };

  removeSearch = (valueToRemove) => {
    const { savedSearches } = this.state;
    const newSavedSearches = savedSearches.filter(value => value === valueToRemove ? false : true);
    window.localStorage.setItem('savedSearches', JSON.stringify(newSavedSearches));
    this.setState(() => ({
      savedSearches: newSavedSearches,
    }));
  };

  handleChange = (value) => {
    this.setState(() => ({value}));
    this.handleChangeDebounced(value);
  }

  onDropdownClick = () => {
    this.setState(state => ({
      showDropdown: !state.showDropdown,
    }))
  }
  onSavedItemSelect = (value) => {
    this.handleChange(value);
    this.hideSavedSearchesDropdown();
  }

  hideSavedSearchesDropdown = () => {
    this.setState(() => ({
      showDropdown: false,
    }))
  }

  render() {
    const { savedSearches, showDropdown } = this.state;
    return (
      <div className='search-bar'>
        <SearchBox
          value={this.state.value}
          onChange={this.handleChange}
        />
        <SaveButton
          title='Save'
          onClick={this.saveSearch}
        />
        <SavedSearchesDropdown
          showDropdown={showDropdown}
          savedSearches={savedSearches}
          onClick={this.onDropdownClick}
          onSelect={this.onSavedItemSelect}
          onRemove={this.removeSearch}
        />
      </div>
    );
  };

  componentDidMount() {
    this.updateDropdownHeight();
  }

  componentDidUpdate() {
    this.updateDropdownHeight();
  }

  updateDropdownHeight = () => {
    const minListHeight = this.state.savedSearches.length * 27;
    const dropdownEl = document.getElementById('dropdown');
    const maxListHeight = window.innerHeight - dropdownEl.offsetTop - 40;
    dropdownEl.style.height = (maxListHeight < minListHeight ? maxListHeight : minListHeight) + 'px';
  }
};



export default SearchBar;