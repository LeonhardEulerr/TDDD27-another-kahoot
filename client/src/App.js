import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
