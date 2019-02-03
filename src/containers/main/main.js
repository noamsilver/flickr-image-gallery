import React, { Component } from 'react';
import SearchBar from '../search-bar';
import ResultsPanel from '../results-panel';
import { flickrAllImages, flickrImageSearch } from '../../api/search-api';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      wasSearchPerformed: false,
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
        wasSearchPerformed: true,
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
        this.setState({
          list: list.photos.photo,
          wasSearchPerformed: true,
        })
      });
    };
  };

  render() {
    console.log('in Main render');
    const { list, wasSearchPerformed } = this.state;
    return (
      <div id='gallery'>
        <div id='header'>
          <h1>Flickr Gallery</h1>
          <SearchBar
            handleChange={this.handleSearchChange}
          />
          </div>
        <ResultsPanel 
          list={list}
          wasSearchPerformed={wasSearchPerformed}
        />
      </div>
    );
  };
};

export default Main;