import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import JoinPage from './JoinPage';
import MainPage from './MainPage';
import LobbyParticipant from './LobbyParticipant';
import ProtectedRoute from './ProtectedRoute';
import CreateQuizPage from './CreateQuizPage';
import ProfilePage from './ProfilePage';

// Contexts
import { SocketContext } from './Contexts/SocketContext';
import { QuizContext } from './Contexts/QuizContext';
import HostLobby from './HostLobby';

import socket from './socketCfg';
import NextQuestion from './NextQuestion';
import QuestionPage from './QuestionPage';

function App() {
  const [pin, setPin] = useState('');
  const [quiz, setQuiz] = useState({});
  const [indexQuestion, setIndexQuestion] = useState(0);

  const quizStates = {
    pin,
    setPin,
    quiz,
    setQuiz,
    indexQuestion,
    setIndexQuestion,
  };

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
    });

    return () => {
      socket.close();
      socket.off();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      <QuizContext.Provider value={quizStates}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/join">
              <JoinPage />
            </Route>
            <Route exact path="/lobby">
              <LobbyParticipant />
            </Route>
            <Route exact path="/nextQuestion">
              <NextQuestion />
            </Route>
            <ProtectedRoute path="/create/:id" component={CreateQuizPage} />
            <ProtectedRoute path="/create" component={CreateQuizPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <ProtectedRoute path="/hostLobby" component={HostLobby} />
            <ProtectedRoute path="/question" component={QuestionPage} />
          </Switch>
        </Router>
      </QuizContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
