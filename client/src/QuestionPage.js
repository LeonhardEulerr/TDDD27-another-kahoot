import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Checkbox,
  Divider,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

const useStyles = makeStyles({
  container: {
    padding: '0em',
    maxWidth: '100vw',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '.5vw',
    minWidth: '120px',
    height: '4vh',
  },
  questionButton: {
    marginBottom: '1vh',
    marginTop: '1vh',
    width: '90%',
    alignSelf: 'center',
  },
  answerBox: {
    display: 'flex',
    //margin: 'auto',
    alignSelf: 'center',
    width: '80vw',
    height: '20vh',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  answerOptionContainer: {
    display: 'flex',
    minWidth: '45vw',
    height: '15vh',
    backgroundColor: '#3f51b5',
    justifySelf: 'stretch',
    margin: '1em',
    borderRadius: '5px',
    wordWrap: 'break-word',
  },
  answerOption: {
    lineHeight: '15vh',
    textAlign: 'center',
    marginLeft: '1vw',
    marginRight: '1vw',
    color: 'white',
  },
  answerTypography: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '1vw',
    color: 'white',
  },
});

export default function QuestionPage() {
  const classes = useStyles();
  const history = useHistory();

  const [questionTitle, setQuestionTitle] = useState('Test title');
  const [answerA, setAnswerA] = useState('Test answer A');
  const [answerB, setAnswerB] = useState('Test answer B');
  const [answerC, setAnswerC] = useState('Test answer C');
  const [answerD, setAnswerD] = useState('Test answer D');
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let myInterval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      console.log('end question');
    }
  }, [timer]);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box
        style={{
          display: 'flex',
          height: '100vh',
          margin: 'auto',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          style={{ textAlign: 'center', marginTop: '0.5em' }}
        >
          {questionTitle}
        </Typography>

        <Box
          flexGrow={1}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box css={{ height: '50vh', margin: 'auto' }}>
            {timer}
            {/* DUMMY BOX */}
          </Box>
          <Box className={classes.answerBox}>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                A
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerA}
              </Typography>
            </Box>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                B
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerB}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.answerBox}>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                C
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerC}
              </Typography>
            </Box>
            <Box className={classes.answerOptionContainer}>
              <Typography variant="h2" className={classes.answerOption}>
                D
              </Typography>
              <Divider orientation="vertical" />
              <Typography variant="h6" className={classes.answerTypography}>
                {answerD}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
