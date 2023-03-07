import React from 'react'
import makeStyles from '@mui/styles/makeStyles';

const Style = makeStyles((theme) => ({
 formContainer : {
    textAlign: 'center',
    fontSize: 18,
    alignContent: 'center',
    padding: theme.spacing(5),
    marginLeft: -30,
    
 },
 paymentImd :{
    textAlign: 'center',
    display:'flex',
    // backgroundImage: 'linear-gradient(310deg, #00255B , #001137, #001137)',
    boxShadow: '0 2px 12px 0 rgb(0 0 0 / 8%)',
    backgroundColor: '#fff',
    border: '1px solid transparent',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0.02857em',
    width: '100%',
    height: '80px',
    marginTop: 2,
    padding: theme.spacing(2),
    margin : 10,
    borderRadius: "10px",
    cursor: "pointer",
    "&:hover": {
        border: '1px solid darkBlue'
    },
    [theme.breakpoints.down('sm')]:{
        width: "280px",
    }
 },

 radioImg: {
    // padding:10,
    // width: 200,
 },

 floozInput: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
 },

 number: {
    padding: theme.spacing(1),
    width: "280px"
 },

}));

export default Style