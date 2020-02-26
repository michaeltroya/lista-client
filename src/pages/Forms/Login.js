import React, { useState } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container } from 'react-bootstrap';
const Login = props => {
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
      localStorage.setItem('token', token);
      // props.history.push('/');
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

          <input type="submit" className="btn btn-full-width" />
        </form>
      </Container>
    </section>
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
