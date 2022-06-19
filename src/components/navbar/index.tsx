import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import {faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
const AppNavbar = ()=> {
  return (
    <Navbar
        color="dark"
        expand="md"
        dark
    >
        <NavbarBrand href="/">
          <FontAwesomeIcon icon={faPeopleGroup} />
        </NavbarBrand>
        
    </Navbar>
  );
}

export default AppNavbar;
