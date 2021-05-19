// react
import React, { useEffect, useState, useContext } from 'react';

// material-ui
import { Box, Button, TextField } from '@material-ui/core';

// components
import Popup from '../Popup';

// contexts
import { SocketContext } from '../Contexts/SocketContext';
import { QuizContext } from '../Contexts/QuizContext';

// utils
import history from '../utils/history';
import { api } from '../utils/api';

// styles
import { useStyles } from './styles';

export default function JoinPage() {
  const classes = useStyles();

  const { socket } = useContext(SocketContext);
  const { setPin } = useContext(QuizContext);

  const [name, setName] = useState('');
  const [localPin, setLocalPin] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socket.on('kick', () => {
      history.replace('/');
    });
  }, [socket, history]);

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
              localStorage.setItem('name', name);
              localStorage.setItem('pin', p);
              history.replace('/lobby');
            } else {
              console.log(error);
              setMsg(error);
              setOpenPopup(true);
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title=""
        msg={msg}
      ></Popup>
    </Box>
  );
}
