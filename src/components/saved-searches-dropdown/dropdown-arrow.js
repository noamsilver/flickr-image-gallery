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
      strokeWidth='8px'
      strokeLinecap='round'
      strokeOpacity='0.7'
    />
  </div>
)

export default DropdownArrow;