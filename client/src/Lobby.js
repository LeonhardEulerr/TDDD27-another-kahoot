import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

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

export default function Lobby() {
  const classes = useStyles();

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
