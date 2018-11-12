import React from 'react';
import Nav from './Nav';
import Button from './Button';

const NavBar = ({ active, handlePngClick, handleNavClick }) => (
  <React.Fragment>
    <Nav dest="/" active={active[0]} handleClick={handleNavClick}>
      Home
    </Nav>
    <Nav dest="/edit" active={active[1]} handleClick={handleNavClick}>
      Edit
    </Nav>
    <Button id="saveButton" handleClick={handlePngClick}>
      Export as PNG
    </Button>
  </React.Fragment>
);

export default NavBar;