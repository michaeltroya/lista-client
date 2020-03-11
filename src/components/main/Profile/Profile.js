import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
//queries
import { FETCH_USER_LISTS_QUERY } from '../../../graphql/query';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/userActions';
//bs imports
import { Container, Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import dayjs from 'dayjs';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//comps
import ListCard from '../../secondary/ListCard/ListCard';
import Nav from '../../layout/Nav/Nav';
import FollowButton from '../../secondary/FollowButton';
import Layout from '../../layout/Layout';

const Profile = props => {
  const authUser = useSelector(state => state.user.credentials.username);
  const usernamePath = props.location.pathname.split('/')[1];
  const { loading, error, data } = useQuery(FETCH_USER_LISTS_QUERY, {
    variables: {
      username: usernamePath
    }
  });
  const dispatch = useDispatch();

  if (error) {
    return (
      <Fragment>
        <Nav type="profile" history={props.history} />
        <Layout>
          <section className="profile-details">
            <h4>Opps!</h4>
            <h1>{error.graphQLErrors[0].message}</h1>
          </section>
        </Layout>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Nav type="profile" history={props.history} />
      <Layout>
        <div className="profile">
          <section className="profile-details">
            <Container fluid>
              {loading ? (
                <Spinner animation="border" className="orange-spinner" />
              ) : (
                <Fragment>
                  <h1>@{data.getUserLists.user.username}</h1>

                  <p className="g-text">
                    Joined{dayjs(data.getUserLists.user.createdAt).format(' MMM YYYY')}
                  </p>
                  <FollowButton currentProfile={usernamePath} />
                  <h4>
                    {data.getUserLists.lists.length} {data.getUserLists.lists.length === 1 ? 'LIST' : 'LISTS'}
                  </h4>
                  {authUser && authUser === usernamePath ? (
                    <div className="logout" onClick={() => dispatch(logout())}>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
                        <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                      </OverlayTrigger>
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Container>
          </section>
          <section className="profile-lists">
            <Container fluid>
              <Row>
                {authUser && authUser === usernamePath ? (
                  <Col xs={12} md={4}>
                    <Link to="/create/list" className="add-list-card">
                      <FontAwesomeIcon icon={faPlusCircle} size="3x" />
                      <h1>Add List</h1>
                    </Link>
                  </Col>
                ) : null}
                {loading ? (
                  <Spinner animation="border" className="orange-spinner" />
                ) : (
                  data.getUserLists.lists.map(list => (
                    <Col xs={12} md={4} key={list.id}>
                      <ListCard list={list} />
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </section>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Profile;
