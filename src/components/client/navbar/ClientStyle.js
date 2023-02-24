import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';

import { alpha } from '@mui/material';

import imgBack from '../../../assets/client/images/bg1.png';
import imgBack2 from '../../../assets/client/images/bg2.png';
import imgBack3 from '../../../assets/client/images/bg3.jpg';
import rond from '../../../assets/client/images/rond.png';
import man3d from '../../../assets/client/images/man3d.jpg';
import backmo from '../../../assets/client/images/backmo.jpg';
import "@fontsource/league-spartan";
import "@fontsource/museomoderno"


// @font-face {
//     font-family: "GoldmanBold";
//     src: local("GoldmanBold"),
//      url("./fonts/Goldman/Goldman-Bold.ttf") format("truetype");
//     font-weight: bold;
//     }

const authStyle = makeStyles((theme) => ({
    imageHeader : {
        textAlign: 'center',
        // height: 'auto',
        paddingTop:100,
        backgroundImage: `url(${backmo})`,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: "100%",
        [theme.breakpoints.down('sm')]: {
            marginTop:5,
            padding: theme.spacing(2),
            // width: 'auto',
            
        },
    },

    startButton: {
        height: 100,
        // position: 'absolute',
    },

    startButtonText: {
        fontSize: 25,
    },

    headerBack:{
        paddingBottom: theme.spacing(4),
        background: theme.palette.gradient.main3,
        [theme.breakpoints.down('sm')]: {
            // width: '450px',
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
        // paddingTop: 30,
        paddingBottom: 30,
        fontSize: 70,
        color: 'white',
        fontFamily: "MuseoModerno",
        // color: theme.palette.primary.main2,
        lineHeight: "60px",
        fontWeight: 900,
        wordSpacing: 2,
        padding: theme.spacing(3),
        [theme.breakpoints.down('lg')]:{
            fontSize: 30,
            lineHeight: "30px",
            fontWeight: 600,
            wordSpacing: 1,
        },
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
        // background: theme.palette.gradient.main3,
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
        // minWidth: '450px',
    },

    toolBar : {
        // background:  "transparent",
        // width: "100%",
        // background: '#191654',  /* fallback for old browsers */
        // background: '-webkit-linear-gradient(to right, #2948ff , #43C6AC)',  /* Chrome 10-25, Safari 5.1-6 */
        // background: 'linear-gradient(to right, #2948ff , #43C6AC)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    },

    action :{
        padding: theme.spacing(5,1,0,1),
    },

    paperAction :{
        // borderRadius: "50%",
        borderRadius: 5,
        background: alpha("#ffff" , 0.1),
        // background: theme.palette.gradient.main,


    },

    filterAction :{
        padding: theme.spacing(0,2,0,2),
    },

    filterPaper :{
        // borderRadius: "50%",
        color: "#172636",
        borderRadius: 5,
        // background: alpha("#fcaf3c" , 1),
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
        background: theme.palette.primary.main3,
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

    eventContainer: {
        padding: theme.spacing(1),
    },

    eventSingle:{
        background: alpha("#ffff" , 0.1),
        borderRadius: 50,
    },

    eventTitle: {
        fontSize: 17,
        fontWeight: 800,
    },

    eventSubTitle:{
        color:'#fcaf3c',
        fontSize: 13
    }

    
}));

export default authStyle;