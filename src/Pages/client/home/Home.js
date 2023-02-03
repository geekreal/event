import React from 'react'
import HomeStyle from './Style';
import { Box, Container, Grid } from '@mui/material';
import ClientNavBar from '../../../components/client/navbar/ClientNavbar'
import Header from '../../../components/client/navbar/Header';
import Body from '../../../components/client/Main/Body';
import Footer from '../../../components/client/footer/Footer';

const Home = () => {
  const classes = HomeStyle();
  return (
    <Box sx={{flexGrow: 1}}  >
      {/* Navar */}
      <ClientNavBar/>

      {/* Header */}
      <Header/>

      {/* Boody */}
      <Body/>
      
      {/* /footer */}
      <Footer/>
      
    </Box>
  )
}

export default Home