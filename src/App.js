import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import HomeStatic from './static-pages/HomeStatic/HomeStatic';
import Login from './static-pages/Forms/Login';
import Signup from './static-pages/Forms/Signup';
import FourOhFour from './static-pages/FourOhFour/FourOhFour';
//comps

import Home from './app-pages/Home/Home';
import AuthRoute from './util/AuthRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={HomeStatic} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <AuthRoute exact path="/home" component={Home} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  );
};

export default App;
