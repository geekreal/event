import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';

import { alpha } from '@mui/material';

import imgBack from '../../../assets/client/images/bg1.png';
import imgBack2 from '../../../assets/client/images/bg2.png';
import imgBack3 from '../../../assets/client/images/bg3.jpg';
import rond from '../../../assets/client/images/rond.png';

// @font-face {
//     font-family: "GoldmanBold";
//     src: local("GoldmanBold"),
//      url("./fonts/Goldman/Goldman-Bold.ttf") format("truetype");
//     font-weight: bold;
//     }

const authStyle = makeStyles((theme) => ({
    header : {
        // width: "auto",
        // height: '400px',
        padding: theme.spacing(4),
        // position: "absolute",
        // display: "flex",
        margin: 0,
        /* fallback for old browsers */
        // background: '#FF5F6D',  
        backgroundColor: "#001122",
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            width: '450px',
            
        },
        
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
        // display:  "flex",
        // justifyContent:  "space-between",
    },

    headerBack:{
        paddingBottom: theme.spacing(4),
        backgroundImage: `url(${imgBack})`,
        backgroundImage: `url(${imgBack3})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.down('sm')]: {
            width: '450px',
        },
    
    },

    bgAnim:{

        paddingTop: -5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        heigh: 450,
        width: 450,

        [theme.breakpoints.down('sm')]: {
            heigh: 300,
            width: 300,
        },

    },
    
    headerSection: {
        display: "flex",
        width: 'auto',
        marginTop: theme.spacing(0),
    },

    rond: {
        backgroundRepeat: 'no-repeat',
        height: 100,
    },


    headerTitle: {
        fontSize: 40,
        color: "white",
        lineHeight: "40px",
        fontWeight: 20,
        wordSpacing: 2,
        padding: theme.spacing(1),
    },

    headerDesc: {
        color: "#fff",
        // [theme.breakpoints.down('lg')] : {
        //     width: 300,
        // },
        // width: 450,
        padding: theme.spacing(1),
    },

    headerBtn: {
        display: 'flex',
        background: theme.palette.gradient.main3,
        width: 300,
        heigh: 200,
        "&:hover": {
            background: theme.palette.gradient.main2,
            cursor:'pointer'
          }
    },

    appBar : {
        // marginBottom: theme.spacing(4),
        background : 'transparent',
    },

    toolBar : {
        // background:  "transparent",
        // width: "100%",
        // background: '#191654',  /* fallback for old browsers */
        // background: '-webkit-linear-gradient(to right, #2948ff , #43C6AC)',  /* Chrome 10-25, Safari 5.1-6 */
        // background: 'linear-gradient(to right, #2948ff , #43C6AC)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    },

    action :{
        marginTop: theme.spacing(5),
    },

    paperAction :{
        // borderRadius: "50%",
        borderRadius: 15,
        background: alpha("#ffff" , 0.1),
        // background: theme.palette.gradient.main,


    },

    paperGrid :{
        padding: theme.spacing(0,2,2,2),
    },

    actionTitleGrid :{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionTitle :{
        color: theme.palette.common.white,
        lineHeight: 1.1,
        padding: theme.spacing(0, 1,1,0),//(t,r,b,l)

    },

    actionSearch :{
       

    },

    actionSearchInput :{
        // backgroundColor: alpha(theme.palette.common.white, 0.20),
        // '&:hover': {
        //     backgroundColor: alpha(theme.palette.common.white, 0.30),
        // },
    },

    actionBtnGrid :{
        // padding: 4,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        
    },

    actionBtnDiv :{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    actionBtn :{
        display: 'flex',
        background: theme.palette.gradient.main2,
        color: theme.palette.primary.main,
    },

    actionBtnIcone :{
        display: 'flex',
        height: 60,
        width: 60,
        background: theme.palette.gradient.main2,
    },
    
    logo: {

    },
    navLink :{

    },
    navText : {

    },
    menusBox :{
        // paddingLeft: theme.spacing(50),
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    
}));

export default authStyle;