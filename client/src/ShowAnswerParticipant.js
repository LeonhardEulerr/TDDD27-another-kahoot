import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import { SocketContext } from './Contexts/SocketContext';
import { QuizContext } from './Contexts/QuizContext';
import {
  makeStyles,
  Container,
  CssBaseline,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    margin: 'auto',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default function ShowAnswerParticipant() {
  const classes = useStyles();
  const history = useHistory();
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
      } else {
        setWrong(true);
        setBackgroundColor('#770000');
      }
    });
  }, []);

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
