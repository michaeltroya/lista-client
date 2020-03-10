import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Nav from '../../components/layout/Nav/Nav';
import StaticNav from '../../components/layout/Nav/StaticNav';
//Redux Imports
import { useSelector } from 'react-redux';

const FourOhFour = props => {
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <Fragment>
      {authenticated ? <Nav type="404" history={props.history} /> : <StaticNav type="home" />}
      <section className="fourOhFour">
        <Container>
          <h3>Oops</h3>
          <h1>You've wandered off</h1>
          <Link to="/" className="btn">
            Return Home
          </Link>
        </Container>
      </section>
    </Fragment>
  );
};
export default FourOhFour;
