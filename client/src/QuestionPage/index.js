import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
} from '@material-ui/core';

import { SocketContext } from '../Contexts/SocketContext';
import { QuizContext } from '../Contexts/QuizContext';

import { useStyles } from './styles';

export default function QuestionPage() {
  const classes = useStyles();
  const history = useHistory();

  const { socket } = useContext(SocketContext);
  const { pin } = useContext(QuizContext);

  const [questionTitle, setQuestionTitle] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [timer, setTimer] = useState(10);

  const [intervalID, setIntervalID] = useState(undefined);

  useEffect(() => {
    socket.emit('getNextQuestionHost', { pin }, ({ question, error }) => {
      console.log(question);
      if (question) {
        setQuestionTitle(question.title);
        setAnswerA(question.answerA);
        setAnswerB(question.answerB);
        setAnswerC(question.answerC);
        setAnswerD(question.answerD);
      } else {
        console.log(error);
      }
    });

    let myInterval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    setIntervalID(myInterval);

    return () => {
      clearInterval(myInterval);
    };
  }, [socket, pin]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalID);
      setTimer(0);

      socket.emit('timeout', { pin }, (success, error) => {
        if (success) {
          history.replace('/stats');
        } else {
          console.log(error);
        }
      });
    }
  }, [timer, history, intervalID, pin, socket]);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box
        style={{
          display: 'flex',
          height: '100vh',
          margin: 'auto',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '0.5em',
          }}
        >
          {questionTitle}
        </Typography>

        <Box
          flexGrow={1}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box css={{ margin: 'auto' }}>
            <Typography variant="h2" style={{ fontWeight: 'bold' }}>
              {timer}
            </Typography>
          </Box>
          <Box className={classes.answerBox}>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                A
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerA}
              </Typography>
            </Box>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                B
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerB}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.answerBox}>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                C
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerC}
              </Typography>
            </Box>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                D
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerD}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
