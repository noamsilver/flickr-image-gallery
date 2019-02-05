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
    
    this.handleScrollChangeThrottled = throttle(this.handleScrollChange, 500)
    this.getAllImages();
  };

  getAllImages = async () => {
    console.log('in getAllImages');
    this.setState(() => ({ lastPage: 1 }))
    const currentSearch = await flickrAllImages();
    currentSearch.text = '';
    console.log({currentSearchAllList: currentSearch});
    this.setState(() => ({
      currentSearch,
      list: currentSearch.photos.photo,
      wasSearchPerformed: true,
      changedSearch: true,
    }));
  };

  handleSearchChange = async (text) => {
    console.log('in handleSearchChange', {text});
    if (text === '') {
      this.getAllImages();
    } else {
      this.setState(() => ({ lastPage: 1 }))
      const currentSearch = await flickrImageSearch(text, 1);
      currentSearch.text = text;
      console.log({currentSearch});
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
    console.log('in handleScrollChange', {
      scrollY: window.scrollY,
      height: document.body.clientHeight,
    });
    const { currentSearch, lastPage } = this.state;
    const { page, pages } = this.state.currentSearch.photos;
    const { scrollY } = window;
    const { clientHeight } = document.body;
    console.log({body: document.body, clientHeight, clientHeight03: clientHeight * 0.3, clientMinus7000: clientHeight - 7000, page, pages});
    console.log({page, pages, lastPage});
    const threshold = clientHeight > 10000 ? clientHeight - 7000 : clientHeight * 0.3;
    if (scrollY > threshold && page < pages && lastPage < page + 1) {
      this.setState(() => ({ lastPage: page + 1 }));
      const newCurrentSearch = await flickrImageSearch(currentSearch.text, page + 1);
      newCurrentSearch.text = currentSearch.text;
      console.log({newCurrentSearch, currentSearch: this.state.currentSearch});
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