import React from 'react';
import { Box, Button, Fade, Grid, Grow, Slide, TextField, Typography } from '@mui/material';
import BodyStyle from './BodyStyle'; 
import makeStyles from '@mui/material';
import calendar from '../../../assets/client/images/calendar.jpg';
import ticket from '../../../assets/client/images/ticket.png';
import geo1 from '../../../assets/client/images/geo1.png';
import geo from '../../../assets/client/images/geo.png';
import contact from '../../../assets/client/images/contact.png';
import { Container } from '@mui/system';
import { Check } from '@mui/icons-material';
import Start from '../navbar/Start';
import Content from './Content';
import Footer from '../footer/Footer';


const Body = () => {
    const classes = BodyStyle();
  return (
    <div className={classes.body}>
      {/* <Start/> */}
      {/* <Content/> */}
      {/* demander une publicité */}
      {/* <Footer/> */}
       
    </div>
  )
}

export default Body