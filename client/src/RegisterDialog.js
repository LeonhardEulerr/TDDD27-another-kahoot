import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

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
    return;
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
            inputProps={{ maxLength: 12 }}
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
            type="submit"
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
