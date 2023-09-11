import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme'
import { alpha } from '@mui/material';

const FooterStyle = makeStyles((theme) => ({
    footerContent: {
        padding: theme.spacing(2),
        margin: theme.spacing(4),
        backgroundColor: alpha(theme.palette.primary.main3 ,0.3),
        // background: theme.palette.primary.main,
        fontSize: 18,
        fontWeight: 800,
    },

    footerGrid: {
        // height: '200px',
        minWidth: '100%'
        
    },

    footerMenu: {
        fontSize: 18,
        fontWeight: 500,
        listStyle: 'none',
        cursor: 'pointer',
        color: 'white',
    },

    footerIcone :{
        textAlign: 'right',
    },

    footerCopy:{
        textAlign: 'left',
    }
}))

export default FooterStyle
