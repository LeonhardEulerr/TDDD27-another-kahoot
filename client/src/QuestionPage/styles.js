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
  answerBox: {
    display: 'flex',
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

export { useStyles };
