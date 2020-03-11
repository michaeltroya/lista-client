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
import { FETCH_TIMELINE_QUERY, FETCH_ALL_LISTS_QUERY } from '../../../graphql/query';
//bs imports
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const following = useSelector(state => state.user.following);
  const { loading, data } = useQuery(FETCH_TIMELINE_QUERY, { variables: { following } });
  const { loading: trendLoad, data: trendData } = useQuery(FETCH_ALL_LISTS_QUERY);

  return (
    <Fragment>
      <Nav type="timeline" />
      <section className="trending-timeline">
        <Container>
          <h1>Trending Lists</h1>

          <div className="lists-container">
            {trendLoad ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              trendData.getLists.map(list => <ListCard list={list} />)
            )}
          </div>
        </Container>
      </section>
      <section className="friends-timeline">
        <Container>
          <h1>My friends Lists</h1>
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
