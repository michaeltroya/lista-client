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
import { Spinner, Container } from 'react-bootstrap';

const Home = () => {
  const following = useSelector(state => state.user.following);
  const { loading, data } = useQuery(FETCH_TIMELINE_QUERY, { variables: { following } });

  return (
    <Fragment>
      <Nav />
      <section className="home-timeline">
        <Container>
          {loading ? (
            <Spinner animation="border" className="orange-spinner" />
          ) : (
            data.getTimeline.map(list => <ListCard list={list} key={list.id} />)
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Home;
