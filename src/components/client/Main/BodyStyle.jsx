import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';
import backmo from '../../../assets/client/images/backmo.jpg';
import motif_c from '../../../assets/client/images/motif_c.png';


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
        background: `url(${motif_c})`,
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
        background: theme.palette.gradient.main2
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
        color: theme.palette.gradient.darkBlue,
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
        background: alpha("#fff", 0.3),
        padding: '20px',
        borderRadius: '15px',
    },

    letterDesc : {
        fontSize: "10px",
    }

}));

export default BodyStyle;