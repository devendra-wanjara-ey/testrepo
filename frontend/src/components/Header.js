import React from 'react';
import logoUrl from '../images/ey_logo.png';
const Header = () => (
  <div className="header">
    <img src={logoUrl} alt="EY" />
     <span style={{ marginLeft:'40em', textEmphasis:'CaptionText' }} >EY Web Team2</span>
  </div>
)
export default Header;