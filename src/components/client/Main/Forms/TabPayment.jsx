import * as React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PaymentForm from './PaymentForm';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import TicketPreview from './TicketPreview';
import { useState } from 'react';
import EmptyCart from '../../EmptyCart';
import { Slide } from '@mui/material';
import { Fragment } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabPayment(props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [checkCart, setCheckCart] = useState(localStorage.getItem('ticketId'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'white', width: "100%" }}>
      <AppBar position="static" sx={{backgroundColor: "white", color: "#001137", 
      boxShadow: "none", fontWeight: "400px", fontSize: "20px",}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Paiement" {...a11yProps(0)} />
          <Tab label="Ticket" {...a11yProps(1)} />
          <Tab label="Télécharger" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <div>
          <TabPanel value={value} index={0} dir={theme.direction}>
            {checkCart !==  "" ? <TicketPreview/>: <EmptyCart/>}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          {checkCart !==  "" ? <PaymentForm eventId ={props.eventId}/> : <EmptyCart/>}
              
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {checkCart !==  "" ? "Item Three" : <EmptyCart/>}
          </TabPanel>
        </div>
        </Slide>
      {/* </SwipeableViews> */}
    </Box>
  );
}