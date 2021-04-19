import React, { useState } from 'react';

import { Box, Button, TextField } from '@material-ui/core';

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

export default function JoinPage() {
  const classes = useStyles();

  const [pinCode, setPinCode] = useState('');

  const join = () => {
    return;
  };

  return (
    <Box className={classes.container}>
      <form className={classes.form} onSumbit={join}>
        <TextField
          className={classes.pinField}
          variant="outlined"
          placeholder="PIN CODE"
          label="PIN CODE"
          value={pinCode}
          onInput={(e) => setPinCode(e.target.value)}
        ></TextField>
        <Button
          type="submit"
          className={classes.button}
          color="primary"
          variant="contained"
        >
          Join
        </Button>
      </form>
    </Box>
  );
}
