import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//queries
import { FETCH_LIST_QUERY } from '../../../graphql/query';
//Redux Imports
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import Nav from '../../layout/Nav/Nav';
//comps
import ListItems from './ListItems';
import ListComments from './ListComments';
import LikeButton from '../../secondary/LikeButton';
import DeleteButton from '../../secondary/DeleteButton';
import ListInfo from './ListInfo';
import Layout from '../../layout/Layout';

const ListPage = props => {
  const username = useSelector(state => state.user.credentials.username);
  const authenticated = useSelector(state => state.user.authenticated);
  const listIdPath = props.location.pathname.split('/')[3];

  const { loading, error, data } = useQuery(FETCH_LIST_QUERY, {
    variables: {
      listId: listIdPath
    }
  });

  if (error) {
    return (
      <Fragment>
        <Nav type="list" history={props.history} />
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
      <Nav type="list" history={props.history} />
      <Layout>
        {loading ? (
          <Spinner animation="border" className="orange-spinner" />
        ) : (
          <div className="list-page">
            <Container fluid>
              <ListInfo data={data} />
              <ListItems items={data.getList.items} username={data.getList.username} />
              <p className="g-text">{dayjs(data.getList.createdAt).format('h:mm A · MMM DD, YYYY')}</p>
              <div className="list-actions">
                <div className="like-count">
                  <LikeButton
                    likeCount={data.getList.likeCount}
                    listId={data.getList.id}
                    likes={data.getList.likes}
                  />
                </div>

                <div className="comment-count">
                  <p>{data.getList.commentCount}</p>
                  {authenticated ? (
                    <FontAwesomeIcon icon={faComments} className="b-text" />
                  ) : (
                    <Link to="/login">
                      <FontAwesomeIcon icon={faComments} className="b-text" />
                    </Link>
                  )}
                </div>
              </div>
              <ListComments comments={data.getList.comments} listId={data.getList.id} />
            </Container>
            {authenticated && data.getList.username === username ? (
              <section className="delete-list">
                <Container fluid>
                  <DeleteButton listId={data.getList.id} username={username} showText />
                </Container>
              </section>
            ) : null}
          </div>
        )}
      </Layout>
    </Fragment>
  );
};

export default ListPage;
