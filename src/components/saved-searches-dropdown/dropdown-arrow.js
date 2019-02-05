import React from 'react';
import { ReactComponent as Arrow } from '../../images/thin-arrowheads-pointing-down.svg';

const DropdownArrow = ({ onClick, showDropdown }) => (
  <div
    className={'dropdown-arrow' + (showDropdown ? ' flip' : '')}
    onClick={onClick}
  >
    <Arrow 
      width={30}
      height={40}
      stroke='white'
      stroke-width='6px'
      stroke-linecap='round'
      stroke-opacity='0.6'
    />
  </div>
)

export default DropdownArrow;