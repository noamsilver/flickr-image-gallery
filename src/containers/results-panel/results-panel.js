import React, { Component } from 'react';
import ImageItem from '../../components/image-item';

class ResultsPanel extends Component {
  render() {
    console.log('in ResultsPanel render');
    const { list } = this.props;
    console.log({list})
    return (
      <div
        className='image-panel'
      >
        {list.length === 0 && <span>No images found</span>}
        {list.map((image, index) => (
          <ImageItem 
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_q.jpg`}
            alt={image.title}
            key={index}
          />
        ))}
      </div>
    );
  };
};

export default ResultsPanel;