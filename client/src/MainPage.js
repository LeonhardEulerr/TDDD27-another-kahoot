import React from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Toolbar,
  Typography,
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
  button: {
    margin: 2,
  },
  topPaper: {},
});

export default function MainPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box
        style={{
          minHeight: '10vh',
          display: 'block',
          background: '#CFCFCF',
          padding: '0em',
        }}
      >
        Dawid
        <Divider variant="middle" />
      </Box>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '90vh', backgroundColor: '#DFDFDF' }}
      >
        <Button className={classes.button} color="primary" variant="contained">
          Create
        </Button>
        <Button className={classes.button} color="primary" variant="contained">
          Join
        </Button>
      </Grid>
    </Container>
  );
}
