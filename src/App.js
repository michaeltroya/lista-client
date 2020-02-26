import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import Home from './pages/Home/Home';
import Login from './pages/Forms/Login';
import Signup from './pages/Forms/Signup';
//comps
import Nav from './components/Nav/Nav';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        <Route exact path="/home" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
