// react ans mui import
import React, { useRef } from 'react';
import { Grid, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BrowserRouter as Router, Route,Switch,Redirect as Navigate } from 'react-router-dom';
import LeftBar from './components/admin/LeftBar';

// Lien des pages
import MasterHome from './components/admin/MasterHome';
import NavBar from './components/admin/Navbar';
import Login from './Pages/admin/auth/Login';
import Dashboard from './Pages/admin/dahboard';
import CreateEventCategory from './Pages/admin/EventCategories/CreateEventCategory';
import EventsList from './Pages/admin/Events/List';

import routes from './routes/routes';

// Index home client
import Home from './Pages/client/home/Home';
import AdminRegister from './Pages/admin/auth/Register';
import AdminLogin from './Pages/admin/auth/Login';
import LoginTest from './Pages/admin/auth/LoginTest';
import axios from 'axios';
import theme from './components/client/ClientTheme';
import AdminPrivateRoute from './AdminPrivateRoute';
import './assets/css/home.css';
import './assets/css/map-box-gl.css';
// client auth
import UserRegister from './Pages/client/auth/Register';
import UserLogin from './Pages/client/auth/Login';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Register from './Pages/admin/auth/Register';
import { useState } from 'react';
import Header from './components/client/navbar/Header';
import Start from './components/client/navbar/Start';

axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization  = token ? `Bearer ${token}` : '';
  return config;
});

axios.defaults.baseURL = "http://localhost:8000/";
// const theme= 
const useStyles = makeStyles((themes) => ({
  leftBar: {},
  contentPage: {},
  optionsTools: {},
  appContent: {
    alignItems: 'center',
    marginTop: themes.spacing(5),
  },
}));

function App() {
  const classes = useStyles();
  const mapContainer = useRef(null);

  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  return (
    <ThemeProvider theme={theme}>
        <div className={classes.container}>
          <Router>
            <Switch>
              <Route path='/' name="Accueil" component = {Home}/>
              {/* <Route exact path='/start' component = {Start}/> */}
              
              <Route path='/admin-login'>
                {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Login/>}
              </Route>
              <Route path='/admin-register'>
                {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Register/>}
              </Route>
              {/* <Route path='/admin-register' component = {AdminRegister}/>
              <Route path='/admin-login' component = {AdminLogin}/> */}
              {/* <Route path='/category-event/create' component = {CreateEventCategory}/> */}
              
              {/* <Route path="/admin" name='Admin'  render={(props) => <MasterHome {...props} />} /> */}

              <AdminPrivateRoute path="/admin" name='Admin' />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
  );

}

export default App;
