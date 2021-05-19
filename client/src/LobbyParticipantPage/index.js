import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useStyles } from './styles';

import { SocketContext } from '../Contexts/SocketContext';

export default function LobbyParticipant() {
  const classes = useStyles();
  const history = useHistory();

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
