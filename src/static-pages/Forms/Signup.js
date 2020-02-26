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

const Signup = props => {
  const client = useApolloClient();
  const [errors, setErrors] = useState({});
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
    update(
      _,
      {
        data: {
          signup: { token }
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
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      confirmPassword: signupData.confirmPassword
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    signupUser();
  };

  return (
    <Fragment>
      <Nav type="form" />
      <section className="signup">
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
              value={signupData.username}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={signupData.confirmPassword}
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
            Already have an account?{' '}
            <Link to="/login" className="o-text">
              Login
            </Link>
          </h4>
        </Container>
      </section>
    </Fragment>
  );
};

const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(
      signupInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Signup;
