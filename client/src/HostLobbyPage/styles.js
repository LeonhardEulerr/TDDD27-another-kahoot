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
  loadingIcon: {
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '120px',
    height: '4vh',
  },
});

export { useStyles };
