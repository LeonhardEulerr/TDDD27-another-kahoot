import { makeStyles } from '@material-ui/core';

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

export { useStyles };
