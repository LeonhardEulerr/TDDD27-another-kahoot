import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { SocketContext } from './Contexts/SocketContext';
import { QuizContext } from './Contexts/QuizContext';

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
  form: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  pinField: {
    margin: 'auto',
  },
  button: {
    marginTop: '0.5em',
    minWidth: '120px',
    height: '4vh',
  },
});

export default function JoinPage() {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState('');

  const { socket } = useContext(SocketContext);
  const { setPin } = useContext(QuizContext);

  const [localPin, setLocalPin] = useState('');

  const getQuizWithPin = (p) => {
    console.log(p);
    api
      .get(`/joinQuiz/${p}`)
      .then((_res) => {
        setPin(p);
        socket.emit(
          'joinParticipant',
          { pin: p, name },
          ({ success, error }) => {
            if (success) {
              history.replace('/lobby');
            } else {
              console.log(error);
            }
          }
        );
      })
      .catch((error) => {
        console.log(error, 'Error occured');
      });
  };

  return (
    <Box className={classes.container}>
      <form className={classes.form}>
        <TextField
          className={classes.pinField}
          variant="outlined"
          placeholder="PIN CODE"
          value={localPin}
          onInput={(e) => setLocalPin(e.target.value)}
        />
        <TextField
          className={classes.pinField}
          variant="outlined"
          placeholder="USERNAME"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => getQuizWithPin(localPin)}
        >
          Join
        </Button>
      </form>
    </Box>
  );
}
