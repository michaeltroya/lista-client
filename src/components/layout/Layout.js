import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VertNav from './Nav/VertNav';

const Layout = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={10}>
          <div className="main">{children}</div>
        </Col>
        <Col xs={0} md={2} className="desktop-col">
          <VertNav />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
