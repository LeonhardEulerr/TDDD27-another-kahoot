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

export default function FinishQuiz() {
  const classes = useStyles();
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const { pin } = useContext(QuizContext);

  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    socket.emit('getQuestionStats', { pin }, ({ scoreboard }) => {
      if (scoreboard) {
        scoreboard.sort((a, b) =>
          a.score > b.score ? -1 : b.score > a.score ? 1 : 0
        );
        setScoreboard(scoreboard);
      }
    });
  }, [socket, pin]);

  const finishQuiz = () => {
    localStorage.removeItem('pin');
    socket.emit('kickAll');
    history.replace('/');
    //disconnect all users
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
                  <Typography key={row.name} variant="h4">{`${i + 1}. ${
                    row.name
                  }: ${row.score}`}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={finishQuiz}>
        FINISH
      </Button>
    </Container>
  );
}
