import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container, Row, Col, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/ListCard/ListCard';
import Nav from '../../components/Nav/Nav';

const Profile = props => {
  const usernamePath = props.location.pathname.split('/')[1];

  const { loading, data } = useQuery(FETCH_USER_LISTS_QUERY, {
    variables: {
      username: usernamePath
    }
  });
  return (
    <Fragment>
      <Nav />
      <div className="profile">
        <Container>
          {loading ? (
            <Spinner animation="border" className="orange-spinner" />
          ) : (
            data.getUserLists.map(list => <List list={list} key={list.id} />)
          )}
        </Container>
      </div>
    </Fragment>
  );
};

const FETCH_USER_LISTS_QUERY = gql`
  query UserLists($username: String!) {
    getUserLists(username: $username) {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
    }
  }
`;

export default Profile;
