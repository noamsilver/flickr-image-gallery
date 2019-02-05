import React from 'react';
import DropdownRowItem from './dropdown-row-item';
import DropdownArrow from './dropdown-arrow';

const SavedSearchesDropdown = ({ showDropdown, savedSearches, onClick, onSelect, onRemove }) => {
  console.log('in SavedSerchesDropdown')
  return (
    <div className='saved-searches-dropdown'>
      <DropdownArrow
        showDropdown={showDropdown}
        onClick={onClick}
      />
      <div
        id='dropdown'
        className={'dropdown' + (showDropdown ? ' show' : '')}
      >
        {savedSearches.map((value, index) => (
          <DropdownRowItem 
            value={value}
            index={index}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
    );
};

export default SavedSearchesDropdown;