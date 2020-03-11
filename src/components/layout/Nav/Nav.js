import React from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//img imports
import Logo from '../../../images/icon.png';
//bs import
import { Container } from 'react-bootstrap';

const Nav = ({ type, history }) => {
  return (
    <nav className={type === 'timeline' ? 'nav app-nav' : 'nav app-nav nav-left'}>
      {type === 'timeline' ? (
        <Container>
          <h2 className="timeline-heading">Home</h2>
          <div className="nav-brand">
            <Link to="/">
              <img src={Logo} alt="logo" className="nav-icon" />
            </Link>
          </div>
        </Container>
      ) : (
        <Container>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          {type === 'compose' ? <h2>Create List</h2> : type === '404' ? <h2>Go back</h2> : <h2>{type}</h2>}
        </Container>
      )}
    </nav>
  );
};
export default Nav;
