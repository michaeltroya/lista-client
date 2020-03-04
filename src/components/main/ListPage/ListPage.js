import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner, Col, Row } from 'react-bootstrap';
import Nav from '../../layout/Nav/Nav';
//queries
import { FETCH_LIST_QUERY } from '../../../graphql/query';
import dayjs from 'dayjs';

//comps
import ListItems from './ListItems';
import ListComments from './ListComments';

const ListPage = props => {
  const listIdPath = props.location.pathname.split('/')[3];

  const { loading, error, data } = useQuery(FETCH_LIST_QUERY, {
    variables: {
      listId: listIdPath
    }
  });

  if (error) {
    return <h1>{error.graphQLErrors[0].message}</h1>;
  }

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
                <p>{dayjs(data.getList.createdAt).format('h:mm A · MMM DD, YYYY')}</p>
                <h3>
                  <Link to={`/${data.getList.username}`}>{`@${data.getList.username}`}</Link>
                </h3>
                <div className="list-tags">
                  {data.getList.tags.map((tag, index) => (
                    <Link to={`/tag/${tag}`} key={index} className="list-tag">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>
              <ListItems items={data.getList.items} />
            </Col>
            <Col xs={12} md={5}>
              <ListComments />
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default ListPage;
