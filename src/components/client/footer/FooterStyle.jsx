import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme'

const FooterStyle = makeStyles((theme) => ({
    footerContent: {
        padding: theme.spacing(2),
        background: theme.palette.primary.main,
        fontSize: 18,
        fontWeight: 800,
        minWidth: '100%'
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
