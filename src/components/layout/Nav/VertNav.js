import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//Redux Imports
import { useSelector } from 'react-redux';

const VertNav = () => {
  const username = useSelector(state => state.user.credentials.username);
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <div className="vert-nav-items">
      {authenticated ? (
        <Fragment>
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to={`/${username}`}>
            <h3>Profile</h3>
          </Link>

          <Link to="/create/list">
            <div className="btn">+ Create list</div>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <h2>New to Lista?</h2>
          <Link to="/signup">
            <div className="btn">Sign up</div>
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default VertNav;
