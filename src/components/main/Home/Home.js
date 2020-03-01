import React, { Fragment } from 'react';
import gql from 'graphql-tag';
//Redux Imports
import { useSelector } from 'react-redux';
//comps
import Nav from '../../layout/Nav/Nav';
const Home = () => {
  const username = useSelector(state => state.user.userDetails.username);

  return (
    <Fragment>
      <Nav />
      <div className="app-home">
        <h2>hi {username}</h2>
      </div>
    </Fragment>
  );
};

export default Home;
