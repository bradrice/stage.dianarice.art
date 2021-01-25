import React from 'react';
import headerStyles from './header.module.scss';
import NavLink from '../link/link';
import { useRouter } from "next/router";
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  const router = useRouter();

  return (
    <header className="header">
<div className={headerStyles.navTop}>
<div className={headerStyles.logoName}>DIANA RICE</div>      
   <Navbar collapseOnSelect expand="md">
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-start">
  <Nav activeKey="/" onSelect={(selectedKey) => console.log(`selected ${selectedKey}`)}>
  <Nav.Item className={headerStyles.navItem}>
    <Nav.Link href="/">Home</Nav.Link>
  </Nav.Item>
  {/* <Nav.Item className={headerStyles.navItem}>
    <Nav.Link href="/about" eventKey="link-1">About</Nav.Link>
  </Nav.Item> */}
  <Nav.Item className={headerStyles.navItem}>
    <Nav.Link href="/art" eventKey="link-2">Art</Nav.Link>
  </Nav.Item>
  <Nav.Item className={headerStyles.navItem}>
    <Nav.Link href="/contact" eventKey="link-3">Contact</Nav.Link>
  </Nav.Item>
    </Nav>
    </Navbar.Collapse>
    </Navbar>
    </div>
    </header>
  )
}

export default Header;