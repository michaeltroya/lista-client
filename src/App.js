import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
//pages
import HomeStatic from './pages/HomeStatic/HomeStatic';
import Login from './pages/Forms/Login';
import Signup from './pages/Forms/Signup';
import FourOhFour from './pages/FourOhFour/FourOhFour';
//comps
import Home from './components/main/Home/Home';
import ListPage from './components/main/ListPage/ListPage';
import Profile from './components/main/Profile/Profile';
import Tags from './components/main/Tags/Tags';
import AuthRoute from './util/AuthRoute';
//Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
