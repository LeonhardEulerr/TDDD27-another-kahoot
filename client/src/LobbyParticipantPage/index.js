// react
import React, { useEffect, useContext } from 'react';

// material-ui
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  CircularProgress,
} from '@material-ui/core';

// contexts
import { SocketContext } from '../Contexts/SocketContext';

// utils
import history from '../utils/history';

// styles
import { useStyles } from './styles';

export default function LobbyParticipant() {
  const classes = useStyles();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('loadNextQuestionView', () => {
      history.replace('/nextQuestion');
    });

    socket.on('kick', () => {
      history.replace('/');
    });
  });

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box className={classes.textIconContainer}>
        <Typography variant="h3">Wait for the quiz to begin...</Typography>
        <CircularProgress className={classes.loadingIcon} />
      </Box>
    </Container>
  );
}
