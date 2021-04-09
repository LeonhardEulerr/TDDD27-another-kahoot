import React, { useState } from 'react';
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
  TextField,
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
    width: 100,
    height: '4vh',
  },
  myForm: {
    height: '4vh',
    display: 'flex',
  },
});

export default function MainPage() {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    return;
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box
        style={{
          minHeight: '8vh',
          display: 'flex',
          marginLeft: 'auto',
          marginRight: '2vw',
          flexDirection: 'column',
          padding: '0em',
        }}
      >
        <Box style={{ display: 'flex', margin: 'auto' }}>
          <form className={classes.myForm} onSubmit={handleLogin}>
            <TextField
              style={{ fontSize: '2', margin: 'auto' }}
              value={login}
              onInput={(e) => setLogin(e.target.value)}
              variant="outlined"
            />
            <TextField
              style={{ fontSize: '2', margin: 'auto' }}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              className={classes.button}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </form>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </Box>
      <Divider />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ margin: 'auto' }}
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
