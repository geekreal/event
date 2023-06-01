import { makeStyles } from '@mui/styles';
import React from 'react'
import useStyle from './Style';
import { theme } from '../../../components/client/ClientTheme';
// import Image from '../../../assets/client/images/vector.jpg'; 
import Image from '../../../assets/client/images/bgb.jpg'; 
import RegisterBg from '../../../assets/client/images/register_bg.jpg'; 

const Style = makeStyles((theme) => ({
    backContainer: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        width: "auto",
        height: "400px",
        marginTop: -10,

    },

    leftGrid :{
        // backgroundImage: `url(${Image})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        // backgroundSize: "cover",
        // backgroundAttachment: "fixed",
        // background : theme.palette.gradient.main,
        // height: '100vh',
        width: "auto",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('lg')] : {
            display: 'none',
        }
    },

    leftGridText: {
        color: theme.palette.common.white,
    },

    inputContainer :{
       
        // [theme.breakpoints.down('lg')] : {
        //     display: 'block',
        // },
        // display: 'flex',
        // textAlign: 'right',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        
    },
    
    rightDiv:{
        // backgroundImage: `url(${RegisterBg})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        // backgroundSize: "cover",
        // backgroundAttachment: "fixed",
        // background: theme.palette.gradient.main2,
        // height: '100vh',

        position: 'static',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
  
}));

export default Style