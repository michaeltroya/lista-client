import React from 'react';
import { Link } from 'react-router-dom';
//bs imports
import { Container, Row, Col } from 'react-bootstrap';

//component imports
import List from '../../components/List/List';

const home = () => {
  return (
    <div className="home">
      <section className="home-hero">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="home-hero-container">
                <h1 className="r-text">Welcome to Lista.</h1>
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
          <div className="home-lists-container">
            <h2>Check out some lists</h2>
            <List />
          </div>
        </Container>
      </section>
    </div>
  );
};
export default home;
