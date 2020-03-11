import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
//Redux Imports
import { useSelector } from 'react-redux';
//comps
import Nav from '../../layout/Nav/Nav';
//comps
import ListCard from '../../secondary/ListCard/ListCard';
//queries
import { FETCH_TIMELINE_QUERY } from '../../../graphql/query';
//bs imports
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const following = useSelector(state => state.user.following);
  const { loading, data } = useQuery(FETCH_TIMELINE_QUERY, { variables: { following } });

  return (
    <Fragment>
      <Nav type="timeline" />
      <section className="home-timeline">
        <Container>
          <Row>
            {loading ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              data.getTimeline.map(list => (
                <Col xs={12} md={4} key={list.id}>
                  <ListCard list={list} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Home;
