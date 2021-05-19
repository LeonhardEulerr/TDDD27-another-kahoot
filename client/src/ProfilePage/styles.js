import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  quizContainer: {
    padding: '0.5em',
    display: 'flex',
    minWidth: '80vw',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    minWidth: '15vw',
    marginLeft: 'auto',
    padding: '1em',
    justifyContent: 'space-around',
  },
});

export { useStyles };
