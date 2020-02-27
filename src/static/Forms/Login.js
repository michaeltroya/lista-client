import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//util
import { getUserFromToken } from '../../util/decode';
//comps
import Nav from '../../components/Nav/Nav';

const Login = props => {
  const client = useApolloClient();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: {
          login: { token }
        }
      }
    ) {
      client.writeData({ data: { userData: getUserFromToken(token) } });
      localStorage.setItem('token', token);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: loginData.username,
      password: loginData.password
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Fragment>
      <Nav type="form" />
      <section className="login">
        {Object.keys(errors).length > 0 ? (
          <div className="form-errors">
            <Container>
              {Object.values(errors).map(err => (
                <h4 key={err}>{err}</h4>
              ))}
            </Container>
          </div>
        ) : null}
        <Container className="form-container">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              autoComplete="off"
            />

            {loading ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              <input type="submit" className="btn btn-full-width" />
            )}
          </form>
          <h4 className="g-text">
            Don't have an account?{' '}
            <Link to="/signup" className="o-text">
              Sign up
            </Link>
          </h4>
        </Container>
      </section>
    </Fragment>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;