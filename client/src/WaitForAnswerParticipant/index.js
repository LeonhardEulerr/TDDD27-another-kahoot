import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import { SocketContext } from '../Contexts/SocketContext';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useStyles } from './styles';

export default function WaitForAnswerParticipantView() {
  const classes = useStyles();
  const history = useHistory();
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
