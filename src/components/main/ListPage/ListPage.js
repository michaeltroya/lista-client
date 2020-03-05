import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner, Col, Row } from 'react-bootstrap';
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
import LikeButton from '../../secondary/LikeButton/LikeButton';

const ListPage = props => {
  const authenticated = useSelector(state => state.user.authenticated);

  const listIdPath = props.location.pathname.split('/')[3];

  const { loading, error, data } = useQuery(FETCH_LIST_QUERY, {
    variables: {
      listId: listIdPath
    }
  });

  if (error) {
    return <h1>{error.graphQLErrors[0].message}</h1>;
  }
  console.log(data);

  return (
    <Fragment>
      <Nav type="list" history={props.history} />
      {loading ? (
        <Spinner animation="border" className="orange-spinner" />
      ) : (
        <Container>
          <Row>
            <Col xs={12} md={7}>
              <section className="list-info">
                <h2>{`${data.getList.title.phrase} ${data.getList.title.count} ${data.getList.title.description}`}</h2>

                <Link to={`/${data.getList.username}`}>
                  <h3 className="o-text">{`@${data.getList.username}`}</h3>
                </Link>
                <div className="list-tags">
                  {data.getList.tags.map((tag, index) => (
                    <Link to={`/tag/${tag}`} key={index} className="list-tag">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>
              <ListItems items={data.getList.items} />
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
            </Col>

            <Col xs={12} md={5}>
              <ListComments comments={data.getList.comments} listId={data.getList.id} />
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default ListPage;
