import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import HomeStatic from './pages/HomeStatic/HomeStatic';
import Login from './pages/Forms/Login';
import Signup from './pages/Forms/Signup';
import FourOhFour from './pages/FourOhFour/FourOhFour';
//comps
import Timeline from './components/main/Timeline/Timeline';
import ListPage from './components/main/ListPage/ListPage';
import Profile from './components/main/Profile/Profile';
import Tags from './components/main/Tags/Tags';
import AuthRoute from './util/AuthRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={HomeStatic} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <AuthRoute exact path="/home" component={Timeline} />
        <Route exact path="/:userId/list/:listId" component={ListPage} />
        <Route exact path="/:userId" component={Profile} />
        <Route exact path="/tag/:tag" component={Tags} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  );
};

export default App;
