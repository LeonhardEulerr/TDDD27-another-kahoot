// react
import React, { useState, useEffect, useContext } from 'react';

// material-ui
import { Container, CssBaseline, Typography } from '@material-ui/core';

// contexts
import { SocketContext } from '../Contexts/SocketContext';
import { QuizContext } from '../Contexts/QuizContext';

// utils
import history from '../utils/history';

// styles
import { useStyles } from './styles';

export default function ShowAnswerParticipant() {
  const classes = useStyles();

  const { socket } = useContext(SocketContext);
  const { pin } = useContext(QuizContext);

  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [timeout, setTimeout] = useState(false);

  useEffect(() => {
    socket.emit('correctAnswer', { pin }, (answer) => {
      if (answer === 'correct') {
        setCorrect(true);
        setBackgroundColor('#007700');
      } else if (answer === 'timeout') {
        setTimeout(true);
        setBackgroundColor('#770000');
      } else if (answer === 'wrong') {
        setWrong(true);
        setBackgroundColor('#770000');
      }
    });

    socket.on('loadNextQuestionView', () => {
      history.replace('/nextQuestion');
    });

    socket.on('kick', () => {
      history.replace('/');
    });
  }, [socket, pin, history]);

  return (
    <Container
      className={classes.container}
      style={{ backgroundColor: backgroundColor }}
    >
      <CssBaseline />
      {correct ? (
        <Typography className={classes.text} variant="h2">
          CORRECT +1
        </Typography>
      ) : null}
      {wrong ? (
        <Typography className={classes.text} variant="h2">
          WRONG...
        </Typography>
      ) : null}
      {timeout ? (
        <Typography className={classes.text} variant="h2">
          TIMEOUT
        </Typography>
      ) : null}
    </Container>
  );
}
