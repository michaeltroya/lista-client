import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import HomeStatic from './pages/HomeStatic/HomeStatic';
import Login from './pages/Forms/Login';
import Signup from './pages/Forms/Signup';
//comps
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import AuthRoute from './util/AuthRoute';
import FourOhFour from './pages/FourOhFour';

const App = () => {
  return (
    <Router>
      <Nav />
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
