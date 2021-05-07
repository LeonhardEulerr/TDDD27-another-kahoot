import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { Box, Button, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

const useStyles = makeStyles({
  container: {
    padding: '0em',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  quizContainer: {
    padding: '0.5em',
    display: 'flex',
    width: '80vw',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    minWidth: '20%',
    marginLeft: 'auto',
    padding: '1em',
    justifyContent: 'space-around',
    hieght: '100%',
  },
});

export default function ProfilePage() {
  const classes = useStyles();
  const history = useHistory();

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

  return (
    <Box className={classes.container}>
      {quizes.map((quiz, i) => {
        return (
          <React.Fragment key={i}>
            <Box className={classes.quizContainer}>
              <Typography style={{ marginLeft: '2vw' }} variant="h5">
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