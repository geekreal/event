import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';
import backmo from '../../../assets/client/images/backmo.jpg';
import back from '../../../assets/client/images/back.jpg';


import { alpha } from '@mui/material';

const BodyStyle = makeStyles((theme) => ({
    carrousel :{
        height: 'auto',
        width: '400px',
        borderRadius: 10,
        // background: theme.palette.gradient.main2,
        textAlign: 'center',
        margin: theme.spacing(2),
        display: 'flex',
        textOverflow: 'ellipsis'
    },

    contentPage :{
        paddingTop: theme.spacing(5),
        backgroundImage: `url(${back})`,
        background: theme.palette.gradient.main3,
        backgroundRepeat: "no-repeat",
        backgroundSize:  "cover",
    },

    slideImg: {
        height: '100px',
        width: '100px',
    },

    slideTitle :{
        textAlign: 'left',
        fontSize: 20,
        padding: 3,
        color: "#172636",
        fontWeight: 800,
    },

    letterTitle :{
        textAlign: 'center',
        fontSize: 40,
        paddingTop: 3,
        paddingBottom: 1,
        color: "#172636",
        fontWeight: 800,
        lineHeight: 1.1,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
          },
    },
    letterText :{
        textAlign: 'center',
        color: "#172636",
        padding: theme.spacing(2),
        
    },

    letterGrid:{
        textAlign: 'center',
    },

    letterBox:{
        padding: theme.spacing(5),
        background: "#ED9A15"
    },

    letterInput :{
        padding: 10,
    },
    // 
    mailButton :{
        background: theme.palette.gradient.main,
       
    },

    slideDesc: {
        textAlign: 'left',
        padding : theme.spacing(0.5),
        wordSpacing: theme.spacing(-0.2)
    },

    gridSlide :{
        padding: theme.spacing(2),
        display: 'inline-block',
        
    },

    getTouchGrid :{
        color: "#172636",
        padding: theme.spacing(3,3,3,3),
        background: alpha('#172636' , 0.1),
    },  

    touchTitle: {
        textAlign: 'center',
        fontSize: 40,
        paddingTop: 3,
        fontWeight: 400,
        lineHeight: 1.1,
        color: "white",
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
        },
    },

    touchImg: {
        textAlign: 'center',
        height: '450px',
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
            height: '250px',
        },
    },

    touchActionTitle :{
        textAlign: 'let',
        fontSize: 15,
        fontWeight: 50,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        lineHeight: 1.1,
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
        },
    },

    touchText :{
        background: alpha("#05BCC1", 0.3),
        padding: '20px',
        borderRadius: '15px',
        backdropFilter: "blur(8px)",
    },

    letterDesc : {
        fontSize: "10px",
    },

    mailInput:{
        borderRadius: 15,
    },  

    eventImage: {
        marginTop: 10,
        padding: 10,
    },

    banner:{
        background: theme.palette.gradient.main3

    },

    bannerText: {
        fontSize: 45,
        padding: theme.spacing(5),
        fontWeight: 900,
        wordSpacing: 1,
        color: theme.palette.gradient.yellow,
        lineHeight: 1,
        textAlign: 'left',

    },

    bannerTextDesc:{
        fontSize: 20,
        padding: theme.spacing(),
        fontWeight: 100,
        wordSpacing: 1,
        color: theme.palette.gradient.yellow,
        lineHeight: 1,
        textAlign: 'left',
    },

    ticketInput: {
        borderRadius: "20px",
    },

    guestAvatar: {
        textAlign: "left",
        paddingBottom: theme.spacing(2),
    },

    cart: {
        position:'fixed',
        // width:'60px',
        // height:'60px',
        bottom:'300px',
        right:'20px',
        borderRadius:'50px',
        textAlign:'center',
        boxShadow: '2px 2px 3px #999',
        color: '#ED9A15'
        // alignItem: 'flex-end'
    },
    
    eventTitle:{
    
    }

}));

export default BodyStyle;