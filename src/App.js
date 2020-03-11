import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import HomeStatic from './pages/HomeStatic/HomeStatic';
import Login from './pages/Forms/Login';
import Signup from './pages/Forms/Signup';
import FourOhFour from './pages/FourOhFour';
//comps
import Timeline from './components/main/Timeline/Timeline';
import ListPage from './components/main/ListPage/ListPage';
import Profile from './components/main/Profile/Profile';
import Tags from './components/main/Tags/Tags';
import AuthRoute from './util/AuthRoute';
import MobiNav from './components/layout/Nav/MobiNav';
import CreateList from './components/main/CreateList/CreateList';

const App = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={HomeStatic} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <AuthRoute exact path="/home" component={Timeline} />
        <AuthRoute exact path="/create/list" component={CreateList} />
        <Route exact path="/:userId/list/:listId" component={ListPage} />
        <Route exact path="/:userId" component={Profile} />
        <Route exact path="/tag/:tag" component={Tags} />
        <Route component={FourOhFour} />
      </Switch>
      <MobiNav />
    </Router>
  );
};

export default App;
