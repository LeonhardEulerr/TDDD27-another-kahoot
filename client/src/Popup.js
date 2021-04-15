import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  dTitle: {
    height: '25px',
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 5,
  },
});

export default function Popup(props) {
  const classes = useStyles();
  const { title, msg, openPopup, setOpenPopup } = props;

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog onClose={handleClose} open={openPopup}>
      <DialogTitle>
        <Typography className={classes.dTitle} variant="h5">
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{msg}</DialogContent>
    </Dialog>
  );
}
