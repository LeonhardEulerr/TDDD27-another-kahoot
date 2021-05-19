import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  pinField: {
    margin: 'auto',
  },
  button: {
    marginTop: '0.5em',
    minWidth: '120px',
    height: '4vh',
  },
});

export { useStyles };
