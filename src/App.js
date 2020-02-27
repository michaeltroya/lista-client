import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const App = () => {
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
