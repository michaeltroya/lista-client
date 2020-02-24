import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//pages
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

//comps

import Nav from './components/Nav/Nav';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
