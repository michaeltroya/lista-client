import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container, Row, Col, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/List/List';
import Nav from '../../components/Nav/Nav';

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
                <h4>
                  From your favourite movies to your favourite NBA players, Lista allows you to create
                  lists...
                </h4>
                <div className="home-buttons">
                  <button className="btn">
                    <Link to="/signup">Sign up</Link>
                  </button>
                  <button className="btn">
                    <Link to="/login">Log in</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-lists">
        <Container>
          <h2>Explore lists</h2>
          <div className="home-lists-container">
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

const FETCH_LISTS_QUERY = gql`
  {
    getLists {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount

      likeCount
    }
  }
`;

export default HomeStatic;
