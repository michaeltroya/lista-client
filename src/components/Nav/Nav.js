import React from 'react';
import { Link } from 'react-router-dom';
//img imports
import Logo from '../../images/main-logo.png';
import { Container } from 'react-bootstrap';
const Nav = () => {
  return (
    <nav className="nav">
      <Container>
        <div className="nav-brand">
          <Link to="/">
            <img src={Logo} alt="logo" className="nav-logo" />
          </Link>
        </div>
        <div className="nav-links">
          <button className="btn btn-clear">
            <Link to="/signup">Sign up</Link>
          </button>
          <button className="btn btn-clear">
            <Link to="/login">Log in</Link>
          </button>
        </div>
      </Container>
    </nav>
  );
};
export default Nav;
