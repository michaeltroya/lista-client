import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
//pages
import HomeStatic from './static/HomeStatic/HomeStatic';
import Login from './static/Forms/Login';
import Signup from './static/Forms/Signup';
import FourOhFour from './static/FourOhFour/FourOhFour';
//comps
import Home from './app/Home/Home';
import AuthRoute from './util/AuthRoute';
import ListPage from './app/ListPage/ListPage';
import Profile from './app/Profile/Profile';
import Tags from './app/Tags/Tags';
//util
import { getUserFromToken } from './util/decode';
//query
import { FETCH_USER_DETAILS_QUERY } from './graphql/server';

const App = () => {
  const client = useApolloClient();
  const token = localStorage.getItem('token');

  const { loading, data } = useQuery(FETCH_USER_DETAILS_QUERY, {
    variables: {
      username: token ? getUserFromToken(token) : ''
    }
  });

  if (!loading) {
    if (token) {
      client.writeData({
        data: {
          userDetails: {
            ...data.getUserDetails
          }
        }
      });
    }
  }

  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={HomeStatic} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <AuthRoute exact path="/home" component={Home} />
        <Route exact path="/:userId/list/:listId" component={ListPage} />
        <Route exact path="/:userId" component={Profile} />
        <Route exact path="/tag/:tag" component={Tags} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  );
};

export default App;
