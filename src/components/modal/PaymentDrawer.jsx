import { Box, Button, SwipeableDrawer } from '@mui/material';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';

const PaymentDrawer = () => {
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

export default PaymentDrawer