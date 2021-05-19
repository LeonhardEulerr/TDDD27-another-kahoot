import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  statsContainer: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1em',
    minWidth: '100vw',
  },
  button: {
    width: '40vw',
    height: '40vh',
    margin: '0.5vh',
    fontSize: '20vh',
    color: '#DDDDDD',
    fontWeight: 'bold',
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
  scoreboardList: { marginTop: '1em', overflowY: 'auto' },
});

export { useStyles };
