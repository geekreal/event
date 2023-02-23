import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from '../ClientTheme';
import imgBack from '../../../assets/client/images/bg1.png';
import imgBack2 from '../../../assets/client/images/bg2.png';
import imgBack3 from '../../../assets/client/images/bg3.jpg';
import rond from '../../../assets/client/images/rond.png';
import { alpha } from '@mui/material';

const MapStyle = makeStyles((theme) => ({

    mapContainer :{
        height: '600px',
    },

    sideBar : {
        backgroundColor: 'rgba(35, 55, 75, 0.9)',
        color: '#fff',
        padding: "6px 12px",
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        margin: "12px",
        borderRadius:"4px",
    },

}));

export default MapStyle;