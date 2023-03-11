import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function AlertMessage(props) {
const [open, setOpen] = useState(props.open);
  return (
    <Box sx={{ width: '100%', margin: 2 }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color={props.color}
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              {props.icon}
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  );
}