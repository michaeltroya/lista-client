import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//img imports
import Logo from '../../../images/main-logo.png';
//bs import
import { Container } from 'react-bootstrap';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/userActions';
const Nav = ({ type, history }) => {
  const dispatch = useDispatch();

  const authenticated = useSelector(state => state.user.authenticated);

  const handleLogout = () => {
    dispatch(logout());
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
  } else if (type === 'tags' && authenticated === true) {
    return (
      <nav className="nav nav-left">
        <Container>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          <h2>Tags</h2>
        </Container>
      </nav>
    );
  } else if (type === 'profile' && authenticated === true) {
    return (
      <nav className="nav nav-left">
        <Container>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          <h2>Profile</h2>
        </Container>
      </nav>
    );
  } else if (type === 'list' && authenticated === true) {
    return (
      <nav className="nav nav-left">
        <Container>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          <h2>List</h2>
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
              <button className="btn btn-clear" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              </button>
            </div>
          </Container>
        </nav>
      </Fragment>
    );
  }
};
export default Nav;
