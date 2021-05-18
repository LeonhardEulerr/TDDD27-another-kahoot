import React, { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import JoinPage from './JoinPage';
import MainPage from './MainPage';
import LobbyParticipant from './LobbyParticipant';
import ProtectedRoute from './ProtectedRoute';
import CreateQuizPage from './CreateQuizPage';
import ProfilePage from './ProfilePage';

import history from './history';

// Contexts
import { SocketContext } from './Contexts/SocketContext';
import { QuizContext } from './Contexts/QuizContext';
import HostLobby from './HostLobby';

import socket from './socketCfg';
import NextQuestion from './NextQuestion';
import QuestionPage from './QuestionPage';
import StatsPage from './StatsPage';
import WaitForAnswerParticipantView from './WaitForAnswerParticipantView';
import ShowAnswerParticipant from './ShowAnswerParticipant';
import FinishQuiz from './FinishQuiz';
import RegisterPage from './RegisterPage';

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
    retrieveLocalStorage();
    if (localStorage.getItem('name')) {
      if (localStorage.getItem('name') == 'host') {
        history.replace('/');
      }
    }

    if (localStorage.getItem('pin') && localStorage.getItem('name')) {
      socket.emit('rejoin', {
        pin: localStorage.getItem('pin'),
        name: localStorage.getItem('name'),
      });
    }

    return () => {
      socket.close();
      socket.off();
    };
  }, []);

  const retrieveLocalStorage = () => {
    if (localStorage.getItem('pin')) {
      console.log(localStorage.getItem('pin'));
      setPin(localStorage.getItem('pin'));
    }

    if (localStorage.getItem('index')) {
      setIndexQuestion(localStorage.getItem('index'));
    }
  };

  return (
    <SocketContext.Provider value={{ socket }}>
      <QuizContext.Provider value={quizStates}>
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
          <Route exact path="/wait">
            <WaitForAnswerParticipantView />
          </Route>
          <Route exact path="/answer">
            <ShowAnswerParticipant />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>

          <ProtectedRoute path="/create/:id" component={CreateQuizPage} />
          <ProtectedRoute path="/create" component={CreateQuizPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <ProtectedRoute path="/hostLobby" component={HostLobby} />
          <ProtectedRoute path="/question" component={QuestionPage} />
          <ProtectedRoute path="/stats" component={StatsPage} />
          <ProtectedRoute path="/endquiz" component={FinishQuiz} />
        </Switch>
      </QuizContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
