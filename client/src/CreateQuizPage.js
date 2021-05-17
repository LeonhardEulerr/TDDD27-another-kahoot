import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  TextField,
  Checkbox,
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
  const history = useHistory();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [questionId, setQuestionId] = useState('');
  const [title, setTitle] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [correctA, setCorrectA] = useState(false);
  const [answerB, setAnswerB] = useState('');
  const [correctB, setCorrectB] = useState(false);
  const [answerC, setAnswerC] = useState('');
  const [correctC, setCorrectC] = useState(false);
  const [answerD, setAnswerD] = useState('');
  const [correctD, setCorrectD] = useState(false);
  const [ids, setIds] = useState([]);
  const [quizId, setQuizId] = useState('');

  useEffect(() => {
    if (ids.length > 0) {
      if (id) updateQuiz();
      else postQuiz();
    }
    if (id) getQuiz(id);
  }, [ids]);

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

  const readInQuestionsFromDb = (qs) => {
    let newArr = [];

    // fill in questions state
    qs.map((q, i) => {
      newArr.push({
        name: `Question ${i + 1}`,
        questionId: q._id,
        title: q.title,
        answerA: q.answerA,
        answerB: q.answerB,
        answerC: q.answerC,
        answerD: q.answerD,
        correctA: q.correctA,
        correctB: q.correctB,
        correctC: q.correctC,
        correctD: q.correctD,
      });
    });
    setQuestions(newArr);

    // show first question
    setIndex(0);
    setQuestionId(newArr[0].questionId);
    setTitle(newArr[0].title);
    setAnswerA(newArr[0].answerA);
    setAnswerB(newArr[0].answerB);
    setAnswerC(newArr[0].answerC);
    setAnswerD(newArr[0].answerD);
    setCorrectA(newArr[0].correctA);
    setCorrectB(newArr[0].correctB);
    setCorrectC(newArr[0].correctC);
    setCorrectD(newArr[0].correctD);
  };

  const addQuestion = () => {
    setIndex(questions.length);
    setQuestions([
      ...questions,
      {
        name: `Question ${questions.length + 1}`,
        questionId: '',
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
      questionId,
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
    console.log(questions);
    setIndex(i);
    setQuestionId(questions[i].questionId);
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

  const updateQuestion = async (question) => {
    try {
      const res = await api.put(`/question/${question.questionId}`, question, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data.id;
    } catch (_err) {
      console.log('error', _err);
    }
  };

  const postQuestion = async (question) => {
    try {
      const res = await api.post('/question', question, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data.id;
    } catch (_err) {
      // setMsg('Login or password does not match!');
      // setOpenPopup(true);
      console.log('error', _err);
    }
  };

  const postAllQuestions = async () => {
    const newArr = [];
    let newId = '';
    for (const q of questions) {
      if (q.questionId) {
        newId = await updateQuestion(q);
      } else {
        newId = await postQuestion(q);
      }
      newArr.push(newId);
    }
    setIds(newArr);
  };

  const postQuiz = async () => {
    let quiz = { name, ids };
    api
      .post('/quiz', quiz, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((_res) => {
        history.replace('/profile');
      })
      .catch((_err) => {
        console.log('error', _err);
      });
  };

  const updateQuiz = () => {
    let quiz = { name, ids };
    api
      .put(`/quiz/${id}`, quiz, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        history.replace('/profile');
      })
      .catch((_err) => {
        console.log('error', _err);
      });
  };

  const getQuiz = () => {
    api
      .get('/quiz', {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        readInQuestionsFromDb(res.data.questions);
      });
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
        <Button
          //className={classes.questionButton}
          color="primary"
          variant="contained"
          onClick={postAllQuestions}
        >
          Save Quiz
        </Button>
      </Box>
    </Container>
  );
}
