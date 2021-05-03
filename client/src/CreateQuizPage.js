import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
  TextField,
  Checkbox,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Popup from './Popup';
import RegisterDialog from './RegisterDialog';
import { useHistory } from 'react-router';

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
  addButton: {
    alignSelf: 'center',
    marginTop: '2vh',
    marginBottom: '2vh',
  },
  textField: {
    marginTop: '4vh',
    width: '70vw',
    height: '10vh',
  },
  quizNameField: {
    marginTop: '4vh',
    width: '70vw',
    height: '5vh',
  },
  answerTextField: {
    width: '25vw',
    height: '10vh',
  },
  answerBox: {
    display: 'flex',
    //margin: 'auto',
    alignSelf: 'center',
    width: '80%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default function CreateQuizPage() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [correctA, setCorrectA] = useState(false);
  const [answerB, setAnswerB] = useState('');
  const [correctB, setCorrectB] = useState(false);
  const [answerC, setAnswerC] = useState('');
  const [correctC, setCorrectC] = useState(false);
  const [answerD, setAnswerD] = useState('');
  const [correctD, setCorrectD] = useState(false);

  useEffect(() => {
    saveQuestion();
  }, [
    title,
    answerA,
    answerB,
    answerC,
    answerD,
    correctA,
    correctB,
    correctC,
    correctD,
  ]);

  const addQuestion = () => {
    setIndex(questions.length);
    setQuestions([
      ...questions,
      {
        name: `Question ${questions.length + 1}`,
        title,
        answerA,
        answerB,
        answerC,
        answerD,
        correctA,
        correctB,
        correctC,
        correctD,
      },
    ]);
    resetStates();
  };

  const saveQuestion = () => {
    let tmpQuestion = {
      name: `Question ${index + 1}`,
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      correctA,
      correctB,
      correctC,
      correctD,
    };
    let newArr = [...questions];
    newArr[index] = tmpQuestion;
    setQuestions(newArr);
  };

  const loadQuestion = (i) => {
    setIndex(i);
    setTitle(questions[i].title);
    setAnswerA(questions[i].answerA);
    setAnswerB(questions[i].answerB);
    setAnswerC(questions[i].answerC);
    setAnswerD(questions[i].answerD);
    setCorrectA(questions[i].correctA);
    setCorrectB(questions[i].correctB);
    setCorrectC(questions[i].correctC);
    setCorrectD(questions[i].correctD);
  };

  const resetStates = () => {
    setTitle('');
    setAnswerA('');
    setAnswerB('');
    setAnswerC('');
    setAnswerD('');
    setCorrectA(false);
    setCorrectB(false);
    setCorrectC(false);
    setCorrectD(false);
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '15vw',
          maxHeight: '100vh',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '15vw',
            maxHeight: '89vh',
            overflow: 'auto',
          }}
        >
          {questions.map((e, i) => (
            <Button
              className={classes.questionButton}
              key={e.name}
              color="primary"
              variant="contained"
              onClick={() => loadQuestion(i)}
            >
              {e.name}
            </Button>
          ))}
        </Box>

        <Fab
          onClick={addQuestion}
          color="primary"
          aria-label="add"
          className={classes.addButton}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        style={{
          display: 'flex',
          height: '100vh',
          margin: 'auto',
          flexDirection: 'column',
        }}
      >
        <TextField
          className={classes.quizNameField}
          inputProps={{
            style: { textAlign: 'center' },
          }}
          InputProps={{
            style: { textAlign: 'center' },
          }}
          placeholder="Name your quiz..."
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
        <TextField
          multiline
          className={classes.textField}
          inputProps={{
            style: { textAlign: 'center' },
          }}
          InputProps={{
            style: { textAlign: 'center', fontSize: '3em' },
          }}
          rowsMax={3}
          placeholder="Type your question here..."
          value={title}
          onInput={(e) => setTitle(e.target.value)}
        />
        <Box
          flexGrow={1}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box css={{ height: '50vh' }}>{/* DUMMY BOX */}</Box>
          <Box className={classes.answerBox}>
            <Box>
              <TextField
                multiline
                className={classes.answerTextField}
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                InputProps={{
                  style: { fontSize: '1.5em' },
                }}
                rowsMax={2}
                placeholder="A..."
                value={answerA}
                onInput={(e) => setAnswerA(e.target.value)}
              />
              <Checkbox
                checked={correctA}
                onChange={(e) => setCorrectA(e.target.checked)}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
            <Box>
              <TextField
                multiline
                className={classes.answerTextField}
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                InputProps={{
                  style: { fontSize: '1.5em' },
                }}
                rowsMax={2}
                placeholder="B..."
                value={answerB}
                onInput={(e) => setAnswerB(e.target.value)}
              />
              <Checkbox
                checked={correctB}
                onChange={(e) => setCorrectB(e.target.checked)}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
          </Box>
          <Box className={classes.answerBox}>
            <Box>
              <TextField
                multiline
                className={classes.answerTextField}
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                InputProps={{
                  style: { fontSize: '1.5em' },
                }}
                rowsMax={2}
                placeholder="C..."
                value={answerC}
                onInput={(e) => setAnswerC(e.target.value)}
              />
              <Checkbox
                checked={correctC}
                onChange={(e) => setCorrectC(e.target.checked)}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
            <Box>
              <TextField
                multiline
                className={classes.answerTextField}
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                InputProps={{
                  style: { fontSize: '1.5em' },
                }}
                rowsMax={2}
                placeholder="D..."
                value={answerD}
                onInput={(e) => setAnswerD(e.target.value)}
              />
              <Checkbox
                checked={correctD}
                onChange={(e) => setCorrectD(e.target.checked)}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
