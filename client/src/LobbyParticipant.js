import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { SocketContext } from './Contexts/SocketContext';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  textIconContainer: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  loadingIcon: {
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

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
