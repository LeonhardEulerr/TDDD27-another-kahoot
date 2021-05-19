import React, { useState } from 'react';
import { TextField, Box, Button } from '@material-ui/core';

import { useHistory } from 'react-router';

import Popup from '../Popup';
import axios from 'axios';
import { useStyles } from './styles';

const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [msg, setMsg] = useState('');

  const register = () => {
    api
      .post('register', { login, password, email })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        history.push('/');
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        setOpenPopup(true);
      });
  };

  return (
    <Box className={classes.container}>
      <form className={classes.form}>
        <TextField
          className={classes.pinField}
          variant="outlined"
          placeholder="EMAIL"
          type="email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.pinField}
          variant="outlined"
          placeholder="USERNAME"
          value={login}
          onInput={(e) => setLogin(e.target.value)}
        />
        <TextField
          className={classes.pinField}
          variant="outlined"
          placeholder="PASSWORD"
          type="password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={register}
        >
          Register
        </Button>
      </form>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title=""
        msg={msg}
      ></Popup>
    </Box>
  );
}
