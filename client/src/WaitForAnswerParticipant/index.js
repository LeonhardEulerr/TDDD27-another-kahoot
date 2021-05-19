// react
import React, { useEffect, useContext } from 'react';

// material-ui
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

// contexts
import { SocketContext } from '../Contexts/SocketContext';

// utils
import history from '../utils/history';

// styles
import { useStyles } from './styles';

export default function WaitForAnswerParticipantView() {
  const classes = useStyles();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('timeout', () => {
      history.replace('/answer');
    });

    socket.on('kick', () => {
      history.replace('/');
    });
  }, [socket, history]);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box className={classes.textIconContainer}>
        <Typography variant="h3">Wait for correct answer...</Typography>
        <CircularProgress className={classes.loadingIcon} />
      </Box>
    </Container>
  );
}
