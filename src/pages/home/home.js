import React from 'react';
//img imports
import Logo from '../../images/logo.png';
//bs imports
import { Container } from 'react-bootstrap';

const home = () => {
  return (
    <div className="home-background">
      <div className="home-overlay">
        <div className="home-logo-container">
          <img src={Logo} alt="logo" className="home-logo" />
        </div>
        <Container>
          <div className="home-content">
            <div className="home-hero-container">
              <h1 className="r-text">Welcome to Lista.</h1>
              <h3>The best platform to share all of your all-time lists</h3>
              <div className="home-buttons">
                <button className="btn">Login</button>
                <button className="btn">Signup</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default home;
