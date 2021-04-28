import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

const useStyles = makeStyles({
  dTitle: {
    height: '25px',
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 5,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    minWidth: '120px',
    height: '4vh',
  },
  regForm: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
  },
  textField: {
    marginBottom: '1em',
  },
});

export default function RegisterDialog(props) {
  const classes = useStyles();
  const { title, openRegForm, setOpenRegForm } = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = () => {
    api
      .post('register', { login, password, email })
      .then((res) => {
        console.log(res.data);
        setOpenRegForm(false);
      })
      .catch((err) => {
        console.log(err);
        setOpenRegForm(false);
      });
  };

  const handleClose = () => {
    setOpenRegForm(false);
  };

  return (
    <Dialog onClose={handleClose} open={openRegForm}>
      <DialogTitle>
        <Typography className={classes.dTitle} variant="h5">
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form className={classes.regForm} onSubmit={register}>
          <TextField
            className={classes.textField}
            inputProps={{ maxLength: 45 }}
            size="small"
            placeholder="Email"
            type="email"
            label="Email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
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
          <Button
            type="button"
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={register}
          >
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
