import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//comps
import Nav from '../../components/Nav/Nav';
const Home = () => {
  const {
    data: {
      userData: { username }
    }
  } = useQuery(GET_USERNAME);

  return (
    <Fragment>
      <Nav />
      <div className="app-home">
        <h2>hi {username}</h2>
      </div>
    </Fragment>
  );
};

const GET_USERNAME = gql`
  query {
    userData @client {
      username
    }
  }
`;

export default Home;
