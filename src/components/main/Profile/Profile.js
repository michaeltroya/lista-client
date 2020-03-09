import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
//queries
import { FETCH_USER_LISTS_QUERY } from '../../../graphql/query';
//Redux Imports
import { useSelector } from 'react-redux';
//bs imports
import { Container, Row, Col, Spinner } from 'react-bootstrap';
//comps
import ListCard from '../../secondary/ListCard/ListCard';
import Nav from '../../layout/Nav/Nav';
import FollowButton from '../../secondary/FollowButton/FollowButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const Profile = props => {
  const authUser = useSelector(state => state.user.credentials.username);
  const usernamePath = props.location.pathname.split('/')[1];
  const { loading, error, data } = useQuery(FETCH_USER_LISTS_QUERY, {
    variables: {
      username: usernamePath
    }
  });

  console.log(authUser);

  if (error) {
    return (
      <Fragment>
        <Nav type="profile" history={props.history} />
        <section className="profile-details">
          <Container>
            <h4>Opps!</h4>
            <h1>{error.graphQLErrors[0].message}</h1>
          </Container>
        </section>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Nav type="profile" history={props.history} />
      <div className="profile">
        <section className="profile-details">
          <Container>
            {loading ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              <Fragment>
                <h1>@{data.getUserLists.user.username}</h1>
                <p className="g-text">Joined{dayjs(data.getUserLists.user.createdAt).format(' MMM YYYY')}</p>
                <FollowButton currentProfile={usernamePath} />
                <h4>
                  {data.getUserLists.lists.length} {data.getUserLists.lists.length > 0 ? 'LIST' : 'LISTS'}
                </h4>
              </Fragment>
            )}
          </Container>
        </section>
        <section className="profile-lists">
          <Container>
            <Row>
              {loading ? (
                <Spinner animation="border" className="orange-spinner" />
              ) : authUser === usernamePath ? (
                data.getUserLists.lists.length === 0 ? (
                  <h1>
                    No lists yet... <br />
                    <Link to="/create/list" className="o-text">
                      Create one
                    </Link>
                  </h1>
                ) : (
                  data.getUserLists.lists.map(list => (
                    <Col xs={12} md={3} key={list.id}>
                      <ListCard list={list} />
                    </Col>
                  ))
                )
              ) : (
                data.getUserLists.lists.map(list => (
                  <Col xs={12} md={3} key={list.id}>
                    <ListCard list={list} />
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </section>
      </div>
    </Fragment>
  );
};

export default Profile;
