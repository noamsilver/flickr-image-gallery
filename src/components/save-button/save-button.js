import React from 'react';

const SaveButton = ({ title, onClick }) => (
  <button
    className='save-button'
    onClick={onClick}
  >
    {title}
  </button>
);

export default SaveButton;