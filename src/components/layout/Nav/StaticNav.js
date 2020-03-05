import React from 'react';
import { Link } from 'react-router-dom';

//img imports
import Logo from '../../../images/main-logo.png';
//bs import
import { Container } from 'react-bootstrap';
//Redux Imports
import { useSelector } from 'react-redux';

const StaticNav = ({ type }) => {
  const authenticated = useSelector(state => state.user.authenticated);

  if (type === 'home' && authenticated === false) {
    return (
      <nav className="nav">
        <Container>
          <div className="nav-brand">
            <Link to="/">
              <img src={Logo} alt="logo" className="nav-logo" />
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/login" className="btn btn-clear">
              Log in
            </Link>
          </div>
        </Container>
      </nav>
    );
  } else {
    return (
      <nav className="nav nav-centered">
        <Container>
          <div className="nav-brand">
            <Link to="/">
              <img src={Logo} alt="logo" className="nav-logo" />
            </Link>
          </div>
        </Container>
      </nav>
    );
  }
};
export default StaticNav;
