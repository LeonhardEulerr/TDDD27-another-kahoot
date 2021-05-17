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
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  statsContainer: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1em',
    minWidth: '100vw',
  },
  button: {
    width: '40vw',
    height: '40vh',
    margin: '0.5vh',
    fontSize: '20vh',
    color: '#DDDDDD',
    fontWeight: 'bold',
  },
  answerBox: {
    display: 'flex',
    //margin: 'auto',
    alignSelf: 'center',
    width: '80vw',
    height: '20vh',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  answerOptionContainer: {
    display: 'flex',
    minWidth: '45vw',
    height: '15vh',
    backgroundColor: '#3f51b5',
    justifySelf: 'stretch',
    margin: '1em',
    borderRadius: '5px',
    wordWrap: 'break-word',
  },
  answerOption: {
    lineHeight: '15vh',
    textAlign: 'center',
    marginLeft: '1vw',
    marginRight: '1vw',
    color: 'white',
  },
  answerTypography: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '1vw',
    color: 'white',
  },
  scoreboardList: { marginTop: '1em', overflowY: 'auto' },
});

export default function StatsPage() {
  const classes = useStyles();
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const { quiz, indexQuestion, setIndexQuestion, pin } =
    useContext(QuizContext);

  const {
    correctA,
    correctB,
    correctC,
    correctD,
    answerA,
    answerB,
    answerC,
    answerD,
  } = quiz.questions[indexQuestion];

  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    socket.emit('getQuestionStats', { pin }, ({ error, scoreboard }) => {
      if (scoreboard) {
        scoreboard.sort((a, b) =>
          a.score > b.score ? -1 : b.score > a.score ? 1 : 0
        );
        setScoreboard(scoreboard);
      }
    });
  }, [socket, pin]);

  const nextQuestion = () => {
    socket.emit(
      'loadNextQuestionView',
      { pin, indexQuestion: indexQuestion + 1 },
      ({ success, error }) => {
        if (success) {
          setIndexQuestion((indexQuestion) => indexQuestion + 1);
          history.replace('/question');
        } else {
          console.log(error);
        }
      }
    );
  };

  const finishQuiz = () => {
    setIndexQuestion(0);
    history.replace('/endquiz');
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />

      <Box className={classes.statsContainer}>
        <Typography
          variant="h4"
          style={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          SCOREBOARD
        </Typography>
        <Divider variant="fullWidth" />
        <Box className={classes.scoreboardList}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '45vh',
            }}
          >
            {scoreboard.map((row, i) => {
              return (
                <Box key={i} style={{ margin: 'auto' }}>
                  <Typography key={row.name} variant="h6">{`${i + 1}. ${
                    row.name
                  }: ${row.score}`}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box className={classes.answerBox}>
        <Box
          className={classes.answerOptionContainer}
          style={{ backgroundColor: correctA ? '#007700' : '#3f51b5' }}
        >
          <Typography variant="h2" className={classes.answerOption}>
            A
          </Typography>
          <Divider orientation="vertical" />
          <Typography variant="h6" className={classes.answerTypography}>
            {answerA}
          </Typography>
        </Box>
        <Box
          className={classes.answerOptionContainer}
          style={{ backgroundColor: correctB ? '#007700' : '#3f51b5' }}
        >
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
        <Box
          className={classes.answerOptionContainer}
          style={{ backgroundColor: correctC ? '#007700' : '#3f51b5' }}
        >
          <Typography variant="h2" className={classes.answerOption}>
            C
          </Typography>
          <Divider orientation="vertical" />
          <Typography variant="h6" className={classes.answerTypography}>
            {answerC}
          </Typography>
        </Box>
        <Box
          className={classes.answerOptionContainer}
          style={{ backgroundColor: correctD ? '#007700' : '#3f51b5' }}
        >
          <Typography variant="h2" className={classes.answerOption}>
            D
          </Typography>
          <Divider orientation="vertical" />
          <Typography variant="h6" className={classes.answerTypography}>
            {answerD}
          </Typography>
        </Box>
      </Box>
      {indexQuestion === quiz.questions.length - 1 ? (
        <Button variant="contained" color="primary" onClick={finishQuiz}>
          FINISH QUIZ
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={nextQuestion}>
          NEXT
        </Button>
      )}
    </Container>
  );
}
