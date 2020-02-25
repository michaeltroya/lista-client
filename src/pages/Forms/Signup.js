import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container } from 'react-bootstrap';
const Signup = () => {
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
    update(proxy, result) {
      console.log(result);
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

  //TODO : SHOW ERRORS ON FRONTEND
  return (
    <section className="signup">
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
            type="text"
            placeholder="Password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
          <input type="submit" className="btn" />
        </form>
      </Container>
    </section>
  );
};

const SIGNUP_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: {
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
