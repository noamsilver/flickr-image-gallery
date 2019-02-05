import React from 'react';
import { ReactComponent as X } from '../../images/clear-x.svg'

const DropdownRowItem = ({value, index, onSelect, onRemove}) => (
  <div
    className='dropdown-row-item'
    key={index}
    onClick={() => onSelect(value)}
  >
    {value}
    <X
      className='clear-x'
      width={10}
      height={10}
      onClick={e => {
        e.stopPropagation();
        onRemove(value);
      }}
    />
  </div>
)

export default DropdownRowItem;