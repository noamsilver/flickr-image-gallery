import React, { Component } from 'react';
import SearchBar from '../search-bar';
import ResultsPanel from '../results-panel';
import { flickrAllImages, flickrImageSearch } from '../../api/search-api';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    this.getAllImages = this.getAllImages.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getAllImages();
  };

  getAllImages() {
    console.log('in getAllImages');
    flickrAllImages().then((list) => {
      console.log({allList: list});
      this.setState({
        list: list.photos.photo,
      });
    });
  };

  handleSearchChange(text) {
    console.log('in handleSearchChange', {text});
    if (text === '') {
      this.getAllImages();
    } else {
      flickrImageSearch(text).then((list) => {
        console.log({searchList: list})
        this.setState({list: list.photos.photo})
      });
    };
  };

  render() {
    console.log('in Main render');
    return (
      <div>
        <h1>Flickr Gallery</h1>
        <SearchBar
          handleChange={this.handleSearchChange}
        />
        <ResultsPanel 
          list={this.state.list}
        />
      </div>
    );
  };
};

export default Main;