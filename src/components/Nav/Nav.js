import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
//gql
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_USER_DATA, GET_AUTHENTICATED } from '../../graphql/clientQueries';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
//img imports
import Logo from '../../images/main-logo.png';
//bs import
import { Container } from 'react-bootstrap';

const Nav = ({ type }) => {
  const {
    data: {
      userDetails: { username }
    }
  } = useQuery(GET_USER_DATA);

  const {
    data: { authenticated }
  } = useQuery(GET_AUTHENTICATED);

  const client = useApolloClient();
  const history = useHistory();

  const handleLogut = () => {
    client.writeData({
      data: {
        userDetails: {
          __typename: 'UserData',
          username: '',
          email: '',
          id: '',
          followers: [],
          following: []
        },
        authenticated: false
      }
    });
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
