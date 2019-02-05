import React from 'react';
import { ReactComponent as X } from '../../images/clear-x.svg'

const DropdownRowItem = ({value, onSelect, onRemove}) => (
  <div
    className='dropdown-row-item'
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