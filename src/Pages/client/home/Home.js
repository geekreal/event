import React, { Fragment, useEffect } from 'react'
import HomeStyle from './Style';
import { Box, Container, CssBaseline, Grid, Slide } from '@mui/material';
import ClientNavBar from '../../../components/client/navbar/ClientNavbar'
import Header from '../../../components/client/navbar/Header';
import Body from '../../../components/client/Main/Body';
import Footer from '../../../components/client/footer/Footer';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';
import backmo from '../../../assets/client/images/backmo.jpg';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import { useState } from 'react';


const Home = () => {
  const classes = HomeStyle();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer)
    };

  }, []);

  return (
    <>
    {loading ? <ReactLoading type='balls' color='red'/> :
      <Box>
        <CssBaseline sx={{ display: 'flex',}}/>
        <Box sx={{flexGrow: 1, height: 700, }}>
          {/* Navar */}
          <ClientNavBar/>

          <Switch>
              {routes.map((route, index) => {
                return (
                  route.component && (
                    <Route 
                    key = {index}
                    path = {route.path}
                    exact = {route.exact}
                    name = {route.name}
                    render = {(props) =>(
                      <route.component {...props} />
                    )}
                    />
                  )
                )
              })}
              <Redirect from='/' to='/event/'/>
            </Switch>

          {/* <ClientNavBar/> */}

          {/* Header */}
          {/* <Header/> */}

          {/* Boody */}
          {/* <Body /> */}
          
          {/* /footer */}
          <Footer/>
          
        </Box>
      </Box>
    }</>
  )
}

export default Home