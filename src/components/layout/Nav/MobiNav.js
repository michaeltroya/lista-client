import React from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
//bs import
import { Container } from 'react-bootstrap';
//Redux Imports
import { useSelector } from 'react-redux';

const MobiNav = () => {
  const username = useSelector(state => state.user.credentials.username);
  const authenticated = useSelector(state => state.user.authenticated);

  if (!authenticated) {
    return null;
  } else
    return (
      <div className="mobi-nav">
        <Container>
          <Link className="mobi-link" to="/home">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
          <Link className="mobi-link" to="/compose/list">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Link>
          <Link className="mobi-link" to={`/${username}`}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </Container>
      </div>
    );
};

export default MobiNav;
