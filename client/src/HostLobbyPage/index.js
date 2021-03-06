// react
import React, { useState, useContext, useEffect } from 'react';

// material-ui
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';

// contexts
import { QuizContext } from '../Contexts/QuizContext';
import { SocketContext } from '../Contexts/SocketContext';

// utils
import history from '../utils/history';

// styles
import { useStyles } from './styles';

export default function HostLobby() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const { socket } = useContext(SocketContext);
  const { pin, setIndexQuestion } = useContext(QuizContext);

  useEffect(() => {
    socket.on('newUser', ({ name }) => {
      setUsers((users) => [...users, name]);
    });

    console.log(pin);
    socket.emit('joinHost', { pin }, (res) => {
      localStorage.setItem('name', 'host');
    });

    return () => {
      socket.off();
    };
  }, [socket, pin]);

  const startQuiz = () => {
    console.log('starting a quiz');
    setIndexQuestion(0);
    localStorage.setItem('index', 0);

    socket.emit(
      'loadNextQuestionView',
      { pin, indexQuestion: 0 },
      ({ success, error }) => {
        if (success) {
          console.log(success);
          history.replace('/question');
        } else {
          console.log(error);
        }
      }
    );
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box style={{ padding: '2em', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h2">{`PIN CODE: ${pin}`}</Typography>
      </Box>

      <Divider />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2em',
        }}
      >
        <Typography varian="h3">Waiting for participants...</Typography>
        <CircularProgress className={classes.loadingIcon} />
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={startQuiz}
        >
          Start
        </Button>
      </Box>
      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignSelf: 'stretch',
          backgroundColor: '#111111',
          marginTop: '2em',
          padding: '1em',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignContent: 'center',
        }}
      >
        {users.map((user, i) => {
          return (
            <Typography
              key={i}
              variant="h5"
              style={{
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                border: '1px solid white',
                borderRadius: '5px',
                padding: '1em',
                margin: '0.2em',
              }}
            >
              {user}
            </Typography>
          );
        })}
      </Box>
    </Container>
  );
}
