import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import Loading from 'react-loading';
// important
import { ThemeProvider } from '@mui/material/styles';
// admin theme
// import {theme} from './components/admin/theme';
import ClientTheme from './components/client/ClientTheme';


ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={ClientTheme}>
      <CssBaseline />
      {/* <Loading type="balls" color="red" ></Loading> */}
        <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
