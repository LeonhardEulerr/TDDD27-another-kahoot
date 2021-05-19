import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from '@material-ui/core';

import { useStyles } from './styles';

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
      <DialogContent dividers>
        <Typography
          variant="h4"
          style={{ paddingLeft: '1em', paddingRight: '1em' }}
        >
          {msg}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
