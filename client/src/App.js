import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import JoinPage from './JoinPage';
import MainPage from './MainPage';
import Lobby from './Lobby';
import ProtectedRoute from './ProtectedRoute';
import TestRoute from './TestRoute';
import CreateQuizPage from './CreateQuizPage';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
          <Link to="/test"> LINK</Link>
        </Route>
        <Route exact path="/join">
          <JoinPage />
        </Route>
        <Route exact path="/lobby">
          <Lobby />
        </Route>
        <ProtectedRoute path="/test" component={TestRoute} />
        <ProtectedRoute path="/create" component={CreateQuizPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  );
}

export default App;
