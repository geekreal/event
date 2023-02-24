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
        width: '400px',
        borderRadius: 10,
        backgroundColor: alpha('#fff' , 0.3),
        // background: theme.palette.gradient.main2,
        textAlign: 'center',
        margin: theme.spacing(0,2,2,2),
        display: 'flex',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('sm')]:{
            // width: 'auto',
            width: '300px',
            margin: theme.spacing(0,2,2,0),
        },
    },

    slideImg: {
        height: '100px',
        width: '100px',
    },

    slideTitle :{
        textAlign: 'left',
        fontSize: 20,
        padding: 3,
        color: theme.palette.primary.main2,
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
        padding : theme.spacing(0.5),
        wordSpacing: theme.spacing(-0.2),
        color: 'black'
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