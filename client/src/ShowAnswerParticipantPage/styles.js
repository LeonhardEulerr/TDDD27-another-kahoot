import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0em',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    margin: 'auto',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export { useStyles };
