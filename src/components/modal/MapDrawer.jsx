import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import { Fragment } from 'react';

const MapDrawer = (props)  =>{
  const [state, setState] = useState({bottom: true});
  const anchor = "bottom";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({state, [anchor]: open });
  };

  return (
    <div>
        <Fragment>
          <Button onClick={toggleDrawer(anchor, true)}>Bottom</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 , 
          minHeight: 300, borderRadius: "15px"}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
              jskjqkjkejkljqkljfoijeoijo
            </Box>
          </SwipeableDrawer>
        </Fragment>
    </div>
  );
}

export default MapDrawer