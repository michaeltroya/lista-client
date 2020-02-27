import React from 'react';
import { Link, useHistory } from 'react-router-dom';
//gql
import { useApolloClient } from '@apollo/react-hooks';
//img imports
import Logo from '../../images/main-logo.png';
//bs import
import { Container } from 'react-bootstrap';

const Nav = ({ type }) => {
  const client = useApolloClient();
  const history = useHistory();

  const handleLogut = () => {
    client.writeData({
      data: {
        userData: {
          __typename: 'UserData',
          username: '',
          email: '',
          id: '',
          authenticated: false
        }
      }
    });
    localStorage.removeItem('token');
    history.push('/');
  };

  if (type === 'home') {
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
  } else if (type === 'forms') {
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
      <nav className="nav">
        <Container>
          <div className="nav-brand">
            <Link to="/">
              <img src={Logo} alt="logo" className="nav-logo" />
            </Link>
          </div>
          <div className="nav-links">
            <button className="btn btn-clear" onClick={handleLogut}>
              Log out
            </button>
          </div>
        </Container>
      </nav>
    );
  }
};
export default Nav;
