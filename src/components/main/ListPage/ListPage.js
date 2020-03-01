import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner, Col, Row } from 'react-bootstrap';
import Nav from '../../layout/Nav/Nav';
//queries
import { FETCH_LIST_QUERY } from '../../../graphql/server';

const ListPage = props => {
  const listIdPath = props.location.pathname.split('/')[3];

  const { loading, error, data } = useQuery(FETCH_LIST_QUERY, {
    variables: {
      listId: listIdPath
    }
  });

  console.log(data);

  if (error) {
    return <h1>{error.graphQLErrors[0].message}</h1>;
  }

  return (
    <Fragment>
      <Nav type="home" />
      {loading ? (
        <Spinner animation="border" className="orange-spinner" />
      ) : (
        <section className="list">
          <Container>
            <Row>
              <Col xs={12} md={7}>
                <div className="list-details">
                  <h2>{`${data.getList.title.phrase} ${data.getList.title.count} ${data.getList.title.description}`}</h2>
                  <h3>
                    <Link to={`/${data.getList.username}`}>{`@${data.getList.username}`}</Link>
                  </h3>
                </div>
              </Col>
              <Col xs={12} md={5}>
                <div className="list-details">
                  <h2>{`${data.getList.title.phrase} ${data.getList.title.count} ${data.getList.title.description}`}</h2>
                  <h3>
                    <Link to={`/${data.getList.username}`}>{`@${data.getList.username}`}</Link>
                  </h3>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </Fragment>
  );
};

export default ListPage;
