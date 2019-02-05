import React, { Component } from 'react';
import EventEmmiter from 'events';
import throttle from '../../utils/throttle';
import Header from '../header';
import ResultsPanel from '../results-panel';
import { flickrAllImages, flickrImageSearch } from '../../api/search-api';

const events = new EventEmmiter();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: undefined,
      list: [],
      wasSearchPerformed: false,
      changedSearch: false,
      lastPage: 0,
    };
    
    this.handleScrollChangeThrottled = throttle(this.handleScrollChange, 500);
  };

  getAllImages = async () => {
    this.setState(() => ({ lastPage: 1 }))
    const currentSearch = await flickrAllImages();
    currentSearch.text = '';
    this.setState(() => ({
      currentSearch,
      list: currentSearch.photos.photo,
      wasSearchPerformed: true,
      changedSearch: true,
    }));
  };

  handleSearchChange = async (text) => {
    if (text === '') {
      this.getAllImages();
    } else {
      this.setState(() => ({ lastPage: 1 }))
      const currentSearch = await flickrImageSearch(text, 1);
      currentSearch.text = text;
      this.setState(() => ({
        currentSearch, 
        list: currentSearch.photos.photo,
        wasSearchPerformed: true,
        changedSearch: true,
      }));
    };
  };

  onClick = () => {
    events.emit('galleryClick');
  };

  handleScrollChange = async () => {
    const { currentSearch, lastPage } = this.state;
    const { page, pages } = this.state.currentSearch.photos;
    const { scrollY } = window;
    const { clientHeight } = document.body;
    const threshold = clientHeight > 10000 ? clientHeight - 7000 : clientHeight * 0.3;
    if (scrollY > threshold && page < pages && lastPage < page + 1) {
      this.setState(() => ({ lastPage: page + 1 }));
      const newCurrentSearch = await flickrImageSearch(currentSearch.text, page + 1);
      newCurrentSearch.text = currentSearch.text;
      this.setState(state => ({
        currentSearch: newCurrentSearch,
        list: [
          ...state.list,
          ...newCurrentSearch.photos.photo,
        ]
      }));
    };
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScrollChangeThrottled, false);
    if (this.state.lastPage === 0) {
      this.getAllImages();
    }
  };

  componentDidUpdate = () => {
    if (this.state.changedSearch) {
      window.scrollTo(0, 0);
      this.setState(() => ({changedSearch: false}))
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScrollChangeThrottled, false);
  };

  render() {
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