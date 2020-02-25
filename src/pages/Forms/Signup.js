import React, { useState } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container } from 'react-bootstrap';
const Signup = props => {
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
    update(_, result) {
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
    <section className="signup">
      {Object.keys(errors).length > 0 ? (
        <div className="form-errors">
          <Container>
            {Object.values(errors).map(err => (
              <h4>{err}</h4>
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
          <input type="submit" className="btn btn-full-width" />
        </form>
      </Container>
    </section>
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