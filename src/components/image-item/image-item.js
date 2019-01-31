import React from 'react';

const ImageItem = ({ src, alt }) => (
  <img
    className='image-item'
    src={src}
    alt={alt}
  />
);

export default ImageItem;