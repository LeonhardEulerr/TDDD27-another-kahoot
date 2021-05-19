import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    minHeight: '8vh',
    maxHeight: '8vh',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '.5vw',
    minWidth: '120px',
    height: '4vh',
  },
  myForm: {
    display: 'flex',
    marginLeft: 'auto',
  },
  textField: {
    width: '150px',
  },
  leftAppName: {
    marginLeft: '1vw',
    fontWeight: 'bold',
  },
  loginContainer: {
    display: 'flex',
    marginLeft: 'auto',
  },
});

export { useStyles };
