import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import Popup from './Popup';
import RegisterDialog from './RegisterDialog';
import { useHistory } from 'react-router';

const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    minHeight: '8vh',
    maxHeight: '8vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '.5vw',
    minWidth: '120px',
    height: '4vh',
  },
  myForm: {
    display: 'flex',
    marginLeft: 'auto',
  },
  textField: {
    width: '150px',
  },
  leftAppName: {
    marginLeft: '1vw',
    fontWeight: 'bold',
  },
  loginContainer: {
    display: 'flex',
    marginLeft: 'auto',
  },
});

export default function MainPage(props) {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [openRegForm, setOpenRegForm] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    validate();
  }, []);

  const validate = () => {
    api
      .get('/validate', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((_res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err.response.data.message);
      });
  };

  const handleLogin = () => {
    api
      .post('/login', { login, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
      })
      .catch((_err) => {
        setMsg('Login or password does not match!');
        setOpenPopup(true);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const createQuiz = () => {
    setOpenPopup(true);
  };

  const join = () => {
    return history.push('join');
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box className={classes.header}>
        <Box style={{ display: 'flex', margin: 'auto', width: '100vw' }}>
          <Typography className={classes.leftAppName} variant="h4">
            Another! Kahoot
          </Typography>
          {!isLoggedIn ? (
            <Box className={classes.loginContainer}>
              <form className={classes.myForm} onSubmit={handleLogin}>
                <TextField
                  className={classes.textField}
                  inputProps={{ maxLength: 12 }}
                  size="small"
                  placeholder="Login"
                  label="Login"
                  value={login}
                  onInput={(e) => setLogin(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  inputProps={{ maxLength: 12 }}
                  type="password"
                  size="small"
                  placeholder="Password"
                  label="Password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
                <Box style={{ display: 'flex', margin: 'auto' }}>
                  <Button
                    type="submit"
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Box>
              </form>
              <Button
                className={classes.button}
                style={{ marginRight: '1vw' }}
                color="primary"
                variant="contained"
                onClick={() => setOpenRegForm(true)}
              >
                Register
              </Button>
            </Box>
          ) : (
            <Box className={classes.loginContainer}>
              <Button
                type="submit"
                className={classes.button}
                style={{ marginRight: '1vw' }}
                color="primary"
                variant="contained"
                onClick={logout}
              >
                Logout
              </Button>{' '}
            </Box>
          )}
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
        <Button
          onClick={createQuiz}
          className={classes.button}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
        <Button
          onClick={join}
          className={classes.button}
          color="primary"
          variant="contained"
        >
          Join
        </Button>
      </Grid>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Test title"
        msg={msg}
      ></Popup>
      <RegisterDialog
        openRegForm={openRegForm}
        setOpenRegForm={setOpenRegForm}
      ></RegisterDialog>
    </Container>
  );
}
