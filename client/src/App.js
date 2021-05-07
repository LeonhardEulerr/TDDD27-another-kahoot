import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import JoinPage from './JoinPage';
import MainPage from './MainPage';
import Lobby from './Lobby';
import ProtectedRoute from './ProtectedRoute';
import CreateQuizPage from './CreateQuizPage';
import ProfilePage from './ProfilePage';

// Contexts
import { SocketContext } from './Contexts/SocketContext';

function App() {
  const ENDPOINT = 'localhost:3000';
  const [socket, setSocket] = useState(io(ENDPOINT));

  useEffect(() => {
    console.log('jaja');
    socket.emit('lala', { lala: 'lalala' });

    socket.on('message', (data) => {
      console.log(data);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
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
          <ProtectedRoute path="/create/:id" component={CreateQuizPage} />
          <ProtectedRoute path="/create" component={CreateQuizPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
