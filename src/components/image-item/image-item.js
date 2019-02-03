import React from 'react';

const ImageItem = ({ src, alt }) => (
  <img
    className='image-item'
    src={src}
    alt={alt}
    title={alt}
  />
);

export default ImageItem;