import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
//img imports
import Logo from '../../../images/main-logo.png';
//bs import
import { Container } from 'react-bootstrap';
//Redux Imports
import { useSelector } from 'react-redux';

const Nav = ({ type }) => {
  const username = '';

  const authenticated = useSelector(state => state.user.authenticated);

  const history = useHistory();

  const handleLogut = () => {
    console.log('logout');
    localStorage.removeItem('token');
    history.push('/');
  };

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
  } else if (type === 'forms' && authenticated === false) {
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
  } else {
    return (
      <Fragment>
        <nav className="nav">
          <Container>
            <div className="nav-brand">
              <Link to="/">
                <img src={Logo} alt="logo" className="nav-logo" />
              </Link>
            </div>
            <div className="nav-links">
              <button className="btn btn-clear" onClick={handleLogut}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              </button>
            </div>
          </Container>
        </nav>
        <div className="mobi-nav">
          <Container>
            <Link className="mobi-link" to={`/${username}`}>
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Link>
            <Link className="mobi-link" to="/home">
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Link>
            <Link className="mobi-link" to="/">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </Link>
          </Container>
        </div>
      </Fragment>
    );
  }
};
export default Nav;
