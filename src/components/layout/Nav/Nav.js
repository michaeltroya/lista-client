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
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userActions';
const Nav = ({ type, history }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={type === 'timeline' ? 'nav' : 'nav nav-left'}>
      {type === 'timeline' ? (
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
      ) : (
        <Container>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          <h2>{type}</h2>
        </Container>
      )}
    </nav>
  );
};
export default Nav;
