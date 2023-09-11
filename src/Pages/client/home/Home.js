import React, { Fragment, useEffect } from 'react'
import HomeStyle from './Style';
import ClientStyle from '../../../components/client/navbar/ClientStyle';
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
import { makeStyles } from '@mui/styles';
import PartnersLists from '../../../components/client/Main/PartnersLists';

const Home = () => {
  const classes = ClientStyle();
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
    <div  className={classes.homeBody}>
    {loading ? <Fragment>
      <div style={{
        opacity: 3,
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: "linear-gradient(to right, #06142e, #1b3358,  #f1916d)",
        overflow: 'hidden',}}>
      <ReactLoading type='balls' color='#fff' />
      </div>
      </Fragment> :
      <Box >
        <CssBaseline sx={{ display: 'flex',}}/>
        <Box sx={{flexGrow: 1, height: 'auto', }}>
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
          <PartnersLists/>
          {/* Header */}
          {/* <Header/> */}

          {/* Boody */}
          {/* <Body /> */}
          
          {/* /footer */}
          <Footer/>
          
        </Box>
      </Box>
    }</div>
  )
}

export default Home