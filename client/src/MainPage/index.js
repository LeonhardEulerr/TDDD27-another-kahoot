// react
import React, { useState, useEffect } from 'react';

// material-ui
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

// components
import Popup from '../Popup';

// utils
import { api } from '../utils/api';
import history from '../utils/history';

// styles
import { useStyles } from './styles';

export default function MainPage() {
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [switchLogin, setSwitchLogin] = useState(false);

  useEffect(() => {
    localStorage.removeItem('pin');
    localStorage.removeItem('name');

    async function fetchData() {
      setIsLoggedIn(await validate());
    }
    fetchData();
  }, [switchLogin]);

  const validate = async () => {
    return api
      .get('/validate', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((_res) => {
        return true;
      })
      .catch((_err) => {
        localStorage.removeItem('token');
        return false;
      });
  };

  const handleLogin = () => {
    api
      .post('/login', { login, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        history.replace('/');
        setSwitchLogin(!switchLogin);
      })
      .catch((_err) => {
        setMsg('Login or password does not match!');
        setLogin('');
        setPassword('');
        setOpenPopup(true);
      });
  };

  const goToRegister = () => {
    history.push('/register');
  };

  const showQuizes = () => {
    return history.push('profile');
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const createQuiz = () => {
    if (isLoggedIn) {
      return history.push('create');
    } else {
      setMsg('You must sign in to be able to create a quiz.');
      setOpenPopup(true);
    }
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
                    // type="submit"
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
                onClick={goToRegister}
              >
                Register
              </Button>
            </Box>
          ) : (
            <Box className={classes.loginContainer}>
              <Button
                className={classes.button}
                style={{ marginRight: '1vw' }}
                color="primary"
                variant="contained"
                onClick={showQuizes}
              >
                Show quizes
              </Button>
              <Button
                type="submit"
                className={classes.button}
                style={{ marginRight: '1vw' }}
                color="primary"
                variant="contained"
                onClick={logout}
              >
                Logout
              </Button>
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
        title=""
        msg={msg}
      ></Popup>
    </Container>
  );
}
