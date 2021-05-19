import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '40vw',
    height: '40vh',
    margin: '0.5vh',
    fontSize: '20vh',
    color: '#DDDDDD',
    fontWeight: 'bold',
  },
});

export { useStyles };
