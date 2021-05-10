import React, { useState, useContext, useEffect } from 'react';
import {
  makeStyles,
  Container,
  Typography,
  Box,
  CssBaseline,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import { QuizContext } from './Contexts/QuizContext';
import { SocketContext } from './Contexts/SocketContext';

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  loadingIcon: {
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function HostLobby() {
  const [users, setUsers] = useState([]);

  const { pin, setPin } = useContext(QuizContext);
  const { socket } = useContext(SocketContext);

  const classes = useStyles();

  useEffect(() => {
    socket.on('newUser', ({ name }) => {
      setUsers((users) => [...users, name]);
    });

    socket.emit('joinHost', { pin }, (res) => {
      console.log(res);
    });

    return () => {
      socket.off();
    };
  }, []);

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
      <Button onClick={() => console.log(users)}>LALALALAL</Button>
    </Container>
  );
}
