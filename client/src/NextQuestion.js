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
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '40vw',
    height: '40vh',
    margin: '0.5vh',
    fontSize: '20vh',
    color: '#DDDDDD',
    fontWeight: 'bold',
  },
});

export default function NextQuestion() {
  const classes = useStyles();
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const { pin } = useContext(QuizContext);

  const [question, setQuestion] = useState(null);
  const [name, setName] = useState('');
  const [score, setScore] = useState(undefined);
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(false);
  const [toggleC, setToggleC] = useState(false);
  const [toggleD, setToggleD] = useState(false);

  useEffect(() => {
    socket.emit(
      'getNextQuestionParticipant',
      { pin },
      ({ question, name, score, error }) => {
        if (question && name) {
          setQuestion(question);
          setName(name);
          setScore(score);
        } else {
          console.log(error);
        }
      }
    );

    socket.on('timeout', ({}) => {
      history.replace('/answer');
    });
  }, []);

  const submitAnswer = () => {
    socket.emit(
      'submitAnswer',
      {
        pin,
        answerA: toggleA,
        answerB: toggleB,
        answerC: toggleC,
        answerD: toggleD,
      },
      (_res) => {
        console.log('Change view to wait for stats');
        history.replace('/wait');
      }
    );
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      {question ? (
        <>
          <Box style={{ margin: 'auto', marginBottom: '0.2vh' }}>
            <Box>
              <Button
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: toggleA ? '#f7155b' : '#3f51b5' }}
                onClick={() => setToggleA(!toggleA)}
              >
                A
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: toggleB ? '#f7155b' : '#3f51b5' }}
                onClick={() => setToggleB(!toggleB)}
              >
                B
              </Button>
            </Box>
            <Box style={{}}>
              <Button
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: toggleC ? '#f7155b' : '#3f51b5' }}
                onClick={() => setToggleC(!toggleC)}
              >
                C
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: toggleD ? '#f7155b' : '#3f51b5' }}
                onClick={() => setToggleD(!toggleD)}
              >
                D
              </Button>
            </Box>
          </Box>
          <Button
            style={{ width: '10vw', fontSize: '1em', margin: 'auto' }}
            variant="contained"
            color="primary"
            onClick={submitAnswer}
          >
            Submit
          </Button>
          <Typography
            variant="h3"
            style={{
              textAlign: 'center',
              lineHeight: '10vh',
              justifySelf: 'cneter',
              backgroundColor: '#FFDDDD',
              height: '10vh',
              fontWeight: 'bold',
            }}
          >
            {`${name}: ${score}`}
          </Typography>
        </>
      ) : (
        <Box
          style={{
            backgroundColor: '#DDDDDD',
          }}
        >
          <div>LOADING</div>
        </Box>
      )}
    </Container>
  );
}
