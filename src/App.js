import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
      </Switch>
    </Router>
  );
};

export default App;
