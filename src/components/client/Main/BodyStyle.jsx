import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';

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
        padding: theme.spacing(5,0,0,5),
        background: alpha('#172636' , 0.1),
    },  

    touchTitle: {
        textAlign: 'center',
        fontSize: 40,
        paddingTop: 3,
        fontWeight: 400,
        lineHeight: 1.1,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
        },
    },

    touchImg: {
        textAlign: 'center',
        height: '500px',
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
            height: '300px',
        },
    },

    touchActionTitle :{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 50,
        paddingTop: theme.spacing(3),
        lineHeight: 1.1,
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
        },
    },

}));

export default BodyStyle;