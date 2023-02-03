import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useState } from 'react';
import { useEffect } from 'react';
import { ConstructionOutlined, Person } from '@mui/icons-material';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ClientInfosModal({infos , state}) {

  const [open, setOpen] = useState(state ? true : false );

  const handleClose = () => {
     setOpen(false)
  }




  console.log("state ", state , "open :", open);

    return (
      <div>
        <Dialog
          open={open}
          reason="backdropClick"
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <Person/>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {infos}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  
}