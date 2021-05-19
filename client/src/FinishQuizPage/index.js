// react
import React, { useState, useEffect, useContext } from 'react';

// material-ui
import {
  Container,
  CssBaseline,
  Box,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';

// contexts
import { SocketContext } from '../Contexts/SocketContext';
import { QuizContext } from '../Contexts/QuizContext';

// utils
import history from '../utils/history';

// styles
import { useStyles } from './styles';

export default function FinishQuiz() {
  const classes = useStyles();
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
