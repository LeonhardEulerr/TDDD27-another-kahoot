// react
import React, { useState, useEffect, useContext } from 'react';

// material-ui
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// contexts
import { SocketContext } from '../Contexts/SocketContext';
import { QuizContext } from '../Contexts/QuizContext';

// utils
import history from '../utils/history';
import { api } from '../utils/api';

// styles
import { useStyles } from './styles';

export default function ProfilePage() {
  const classes = useStyles();

  const { setPin, setQuiz } = useContext(QuizContext);
  const { socket } = useContext(SocketContext);

  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    getQuizes();
  }, []);

  const getQuizes = () => {
    api
      .get('/quizes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setQuizes(res.data.quizes);
      })
      .catch((_err) => {
        console.log('Error occured');
      });
  };

  const deleteQuiz = (index) => {
    const quizId = quizes[index]._id;
    api
      .delete('/quizes', {
        data: { quizId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((_res) => {
        let newArr = [...quizes];
        newArr.splice(index, 1);
        setQuizes(newArr);
      })
      .catch((_err) => {
        console.log('Error occured');
      });
  };

  const editQuiz = (id) => {
    console.log('quiz to edit', id);
    history.push(`create/${id}`);
  };

  const startQuiz = (id, i) => {
    console.log('quiz to start', id);
    api
      .post(
        '/startQuiz',
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setPin(res.data.quiz.pin);
        localStorage.setItem('pin', res.data.quiz.pin);

        socket.emit(
          'addQuiz',
          { pin: res.data.quiz.pin, quiz: quizes[i] },
          ({ success, error }) => {
            if (success) {
              setQuiz(quizes[i]);
              history.replace('/hostLobby');
            } else {
              console.log(error);
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backToMainPage = () => {
    history.push('/');
  };

  return (
    <Box className={classes.container}>
      <CssBaseline />
      <Button
        variant="contained"
        color="primary"
        onClick={backToMainPage}
      >{`< Back to main`}</Button>
      {quizes.map((quiz, i) => {
        return (
          <React.Fragment key={i}>
            <Box className={classes.quizContainer}>
              <Typography style={{ marginLeft: '1em' }} variant="h5">
                {quiz.name}
              </Typography>

              <Box className={classes.buttonContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    editQuiz(quiz._id);
                  }}
                >
                  <EditIcon size="large" />
                </Button>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    deleteQuiz(i);
                  }}
                >
                  <DeleteIcon size="large" />
                </Button>

                <Button
                  style={{ backgroundColor: '#00CC22' }}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    startQuiz(quiz._id, i);
                  }}
                >
                  <PlayArrowIcon size="large" />
                </Button>
              </Box>
            </Box>
            <Divider
              style={{ width: '80vw', marginLeft: 'auto', marginRight: 'auto' }}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
}
