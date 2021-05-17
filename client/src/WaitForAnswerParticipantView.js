import React, { useEffect, useContext } from 'react';

import { SocketContext } from './Contexts/SocketContext';
import {
  makeStyles,
  Container,
  CssBaseline,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

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

export default function WaitForAnswerParticipantView() {
  const classes = useStyles();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('correctAnswer', () => {
      return;
    });
  }, [socket]);

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
