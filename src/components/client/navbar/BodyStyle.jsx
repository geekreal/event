import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';
import imgBack from '../../../assets/client/images/bg1.png';
import imgBack2 from '../../../assets/client/images/bg2.png';
import imgBack3 from '../../../assets/client/images/bg3.jpg';
import rond from '../../../assets/client/images/rond.png';
import { alpha } from '@mui/material';

const BodyStyle = makeStyles((theme) => ({
    carrousel :{
        height: 'auto',
        width: 'auto',
        [theme.breakpoints.down('sm')]:{
            height: 'auto',
            width: 'auto',
            margin: theme.spacing(0,2,2,0),
            fontSize: 15,
        },
    },

    slideImg: {
        height: '350px',
        width: 'auto',
        paddingRight: 5,
        alignContent: 'center',
        alignItems: 'center',

    },

    slideTitle :{
        textAlign: 'left',
        fontSize: 15,
        padding: 3,
        color: "#ccccff",
        fontWeight: 600,
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
        fontSize: 15,
        padding : theme.spacing(0.5),
        wordSpacing: theme.spacing(-0.2),
        color: '#9999ff'
    },

    gridSlide :{
        padding: theme.spacing(2),
        display: 'inline-block',

    },

    topGridSlide :{
        padding: theme.spacing(2),
        display: 'inline-block',
        paddingBottom: theme.spacing(4),
        // backgroundImage: `url(${rond})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contained',
        // backgroundPosition: 'center',
        // [theme.breakpoints.down('sm')]: {
        //     width: '450px',
        // },

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