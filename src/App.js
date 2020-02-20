import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
//pages
import home from './pages/home';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
