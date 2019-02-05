import React, { Component } from 'react';
import EventEmmiter from 'events';
import Header from '../header';
import ResultsPanel from '../results-panel';
import { flickrAllImages, flickrImageSearch } from '../../api/search-api';

const events = new EventEmmiter();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      wasSearchPerformed: false,
    };
    
    this.getAllImages();
  };

  getAllImages = () => {
    console.log('in getAllImages');
    flickrAllImages().then((list) => {
      console.log({allList: list});
      this.setState(() => ({
        list: list.photos.photo,
        wasSearchPerformed: true,
      }));
    });
  };

  handleSearchChange = (text) => {
    console.log('in handleSearchChange', {text});
    if (text === '') {
      this.getAllImages();
    } else {
      flickrImageSearch(text).then((list) => {
        console.log({searchList: list})
        this.setState(() => ({
          list: list.photos.photo,
          wasSearchPerformed: true,
        }))
      });
    };
  };

  onClick = () => {
    events.emit('galleryClick');
  }

  render() {
    console.log('in Main render');
    const { list, wasSearchPerformed } = this.state;
    return (
      <div 
        id='gallery'
        onClick={this.onClick}
      >
        <Header 
          handleSearchChange={this.handleSearchChange}
          events={events}
        />
        <ResultsPanel 
          list={list}
          wasSearchPerformed={wasSearchPerformed}
        />
      </div>
    );
  };
};

export default Main;