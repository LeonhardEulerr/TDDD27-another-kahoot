// react
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import JoinPage from './JoinPage';
import MainPage from './MainPage';
import LobbyParticipant from './LobbyParticipantPage';
import CreateQuizPage from './CreateQuizPage';
import ProfilePage from './ProfilePage';
import NextQuestion from './NextQuestionPage';
import QuestionPage from './QuestionPage';
import StatsPage from './StatsPage';
import WaitForAnswerParticipantView from './WaitForAnswerParticipant';
import ShowAnswerParticipant from './ShowAnswerParticipantPage';
import FinishQuiz from './FinishQuizPage';
import RegisterPage from './RegisterPage';
import HostLobby from './HostLobbyPage';

// utils
import history from './utils/history';
import ProtectedRoute from './utils/ProtectedRoute';
import socket from './utils/socketCfg';

// Contexts
import { SocketContext } from './Contexts/SocketContext';
import { QuizContext } from './Contexts/QuizContext';

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
      if (localStorage.getItem('name') === 'host') {
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
