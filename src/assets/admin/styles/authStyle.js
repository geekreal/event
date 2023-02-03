import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../../../components/admin/theme';

const authStyle = makeStyles((theme) => ({
    FooterPied : {},
    input : {
        color: 'red'
    },
    textField : {
        color: 'red',
        display: "flex",
        // marginRight: theme.spacing(20),
        // [theme.breakpoints.down("sm")] :{
        //     // marginTop: theme.spacing(0),
        // }
    },
    inputContainer :{
        marginTop: theme.spacing(10),
        [theme.breakpoints.up("sm")] :{
            width: "80vh",
            alignItems: "center",
        }
    },

    loginHeader:{
        marginTop: theme.spacing(2)
        // margin: 0,
        // backgroundColor: theme.palette.primary.main
    },
    loginHeaderAvatar:{
        
        // bgcolor:  theme.palette.primary.main,
    },
    loginHeaderText:{
        color:  theme.palette.primary.main,
    },
    
}));

export default authStyle;