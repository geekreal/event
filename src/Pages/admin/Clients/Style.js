import React from 'react'

import makeStyle from '@mui/styles/makeStyles';
import theme from '../../../components/admin/theme';

const Style = makeStyle((theme) => ({
    paper:{
        marginLeft: theme.spacing(2)
    },
    // contentMain: {
    //     marginTop: theme.spacing(6),
    // },
    breadcrumbs:{
        margin: theme.spacing(2,0,2,2)
    },
    formTitle:{
        padding: theme.spacing(2,0,2,4)
    },
    // formContent:{
    //     paddingLeft: theme.spacing(4),
    //     paddingRight: theme.spacing(4),
    // },
    formButton:{
        display: 'flex',
        alignContent: 'space-evenly',
        padding: theme.spacing(4),
    },
    submitButton: {
        paddingRight: theme.spacing(2),
    }
}));

export default Style