import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';

//bs imports
import { Container, Row, Col, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/secondary/ListCard/ListCard';
import Nav from '../../components/layout/Nav/Nav';
//queries
import { FETCH_LISTS_QUERY } from '../../graphql/query';

const HomeStatic = () => {
  const { loading, data } = useQuery(FETCH_LISTS_QUERY);
  return (
    <Fragment>
      <Nav type="home" />
      <section className="home-hero">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="home-hero-container">
                <h1 className="o-text">Welcome to Lista</h1>
                <h3>The best platform to share your all-time lists</h3>
                <h4 className="g-text">
                  From your favourite movies to your favourite NBA players, Lista allows you to create
                  lists...
                </h4>
                <div className="home-buttons">
                  <Link to="/signup" className="btn">
                    Sign up
                  </Link>
                  <Link to="/login" className="btn">
                    Log in
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-lists">
        <Container>
          <h2>Explore lists</h2>
          <div className="lists-container">
            {loading ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              data.getLists.map(list => <List list={list} key={list.id} />)
            )}
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default HomeStatic;
