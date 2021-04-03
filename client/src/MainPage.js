import React from 'react';
import { Button, Container, CssBaseline, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    margin: 2,
  },
});

export default function MainPage() {
  const classes = useStyles();
  return (
    <Container style={{ backgroundColor: '#123111' }}>
      {/* <CssBaseline /> */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
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
