import React from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container, Row, Col } from 'react-bootstrap';
const Login = () => {
  const handleSubmit = () => {};

  return (
    <div className="login">
      <Container>
        <form onSubmit={handleSubmit} noValidate>
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="password" />
        </form>
      </Container>
    </div>
  );
};
export default Login;
