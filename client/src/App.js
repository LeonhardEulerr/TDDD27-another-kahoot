import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import JoinPage from './JoinPage';
import MainPage from './MainPage';
import Lobby from './Lobby';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/join">
          <JoinPage />
        </Route>
        <Route exact path="/lobby">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
