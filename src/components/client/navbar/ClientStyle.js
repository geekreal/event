import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';

import { alpha } from '@mui/material';

import imgBack from '../../../assets/client/images/bg1.png';
import imgBack2 from '../../../assets/client/images/bg2.png';
import imgBack3 from '../../../assets/client/images/bg3.jpg';
import rond from '../../../assets/client/images/rond.png';
import man3d from '../../../assets/client/images/man3d.jpg';
import colorbg from '../../../assets/client/images/bgb.jpg';
import webGb1 from '../../../assets/client/images/WebBackground.jpg';
import webBg from '../../../assets/client/images/webBg.png';
import shape1 from '../../../assets/client/images/Shape1.png';
import shape2 from '../../../assets/client/images/Shape2.png';
import "@fontsource/league-spartan";
import "@fontsource/museomoderno"


// @font-face {
//     font-family: "GoldmanBold";
//     src: local("GoldmanBold"),
//      url("./fonts/Goldman/Goldman-Bold.ttf") format("truetype");
//     font-weight: bold;
//     }

const authStyle = makeStyles((theme) => ({

    homeBody :{
        background: theme.palette.gradient.main3,
    },

    mainTitle: {
        textAlign: 'center',
        display: 'flex',
        width: '100vh',
        textAlign: 'left',
        padding: 2,
        
    },
    carouselCard : {
        // backgroundColor: alpha('#ffffff' ,0.4),
        height: '450px',
    },

    gridBack :{
        backgroundImage: `url(${shape2})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '400px',
        transition: 'all 1s ease-in-out',
        [theme.breakpoints.down('lg')]:{
            backgroundRepeat: 'repeat-y',
        }
        
        // backgroundImage: `url(${colorbg})`,
        // backgroundSize:'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // height: "700px"
        // background: theme.palette.gradient.main3,
        // heigh: '100%',
        // minHeigh: '100%',
        // backgroundImage: `url(${web1})`,

        // backgroundSize:'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
    },

    imageHeader : {
        
        paddingTop:50,
        background: theme.palette.gradient.main3,
        // backgroundImage: `url(${webBg})`,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: "600px",
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(10),
            padding: theme.spacing(2),
            width: 'auto',
            height: 'auto',
            
        },
    },

    createEventButton: {
        height: 60,
        background: theme.palette.gradient.main,
    },

    startButton: {
        height: 60,
        background: theme.palette.gradient.main3,
        "&:hover": {
            backgroundColor: theme.palette.gradient.main3,
            cursor:'pointer'
          }
        // position: 'absolute',
    },

    downloadBtn: {
        height: 50,
        display: 'inline-block',
        "&:hover": {
            backgroundColor: theme.palette.gradient.main3,
            cursor:'pointer'
          }
        // position: 'absolute',
    },

    startButtonText: {
        color: theme.palette.primary.main,

    },
    downloadButtonText: {
        fontSize: 18,
        color: theme.palette.primary.main,

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
        fontSize: 70,
        color: theme.palette.primary.main5,
        lineHeight: "70px",
        fontWeight: 800,
        wordSpacing: 0,
        width: 'auto',
        textAlign: 'left',
        padding: 10,
        margin: theme.spacing(0,1,1,1),
        padding: theme.spacing(5),
        [theme.breakpoints.down('lg')]:{
            fontSize: 45,
            lineHeight: "50px",
            fontWeight: 700,
            wordSpacing: 1,
            padding: theme.spacing(3),
            margin: theme.spacing(0),
        },
    },

    headerDesc: {
        color: theme.palette.primary.main1,
        [theme.breakpoints.down('sm')] : {
            width: 300,
        },
        width: 450,
        padding: theme.spacing(1),
        
    },

    headerBtn: {
        display: 'flex',
        // background: theme.palette.gradient.main3,
        width: 100,
        heigh: 200,
        "&:hover": {
            background: theme.palette.gradient.main3,
            cursor:'pointer'
          }
    },

    appBar : {
        // marginBottom: theme.spacing(4),
        background : 'none',
        paddingTop: theme.spacing(5),
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
        padding: theme.spacing(10,5,5,5),//top,left,bottom,right
    },

    paperAction :{
        // borderRadius: "50%",
        borderRadius: 5,
        // background: alpha(theme.palette.primary.main3 , 0.4),
        background: theme.palette.primary.main3,
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

    eventFilterBlock :{
        color: 'primary',
        background: theme.palette.primary.main,
    },

    eventAvatar:{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main4,
    },

    eventGridActionBtn :{
        color: theme.palette.primary.main
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
        backgroundColor: '#06142e',
        color: theme.palette.primary.main0,
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
        // justifyContent: "center",
    },

    eventContainer: {
        padding: theme.spacing(1),
    },

    eventSingle:{
        // background: alpha("#ffff" , 0.1),
        background: theme.palette.primary.main,
        color: theme.palette.primary.main4,
        borderRadius: 50,
    },

    eventTitle: {
        fontSize: 17,
        fontWeight: 800,
        color: theme.palette.primary.main0,
    },

    eventSubTitle:{
        color:theme.palette.primary.main0,
        fontSize: 13
    },

    // Partenaire
    PartnersBox : {
        padding: 10,
        margin: 30,
        background: 'white',
        borderRadius: 15,
    }  ,
    
    PartnersLogo : {
        height: '50px',
        // width: '100px',
    },

    partnersGrid : {
        
        display: 'flex',
        alignContent: 'center',
    },
    partnersTitle :{
        fontSize: 50,
        color: theme.palette.primary.main,
        fontWeight: 600,
    },

    partnersDesc :{
        fontSize: 30,
        color: theme.palette.primary.main,
        fontWeight: 100,
    }

    
}));

export default authStyle;