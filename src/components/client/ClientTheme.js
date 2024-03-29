import { createTheme } from "@mui/material";
import { blue, color, green, lightBlue } from "@mui/material/colors";
import { theme } from "../admin/theme";

import Helvetica from './fonts/Helvetica.ttf';
import "@fontsource/league-spartan";
import "@fontsource/museomoderno"
import "@fontsource/roboto";
require('typeface-almarai');


const helvetica = {
  fontFamily: 'Helvetica',
  fontStyle: 'bold',
  // fontDisplay: 'swap',
  // fontWeight: '700',
  src: `
    local('Helvetica'),
    local('Helvetica'),
    url(${Helvetica}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const ClientTheme = createTheme({
  root: {
    background :'linear-gradient(to right, #06142e, #1b3358,  #f1916d)',
  },
  palette: {
    primary: {
      main: "#ffffff",//blanc
      main0: "#06142e",//bleu pur
      main2: "#1b3358",  //bleu
      main3: '#473e66', //Bleu occre
      main4: '#bd83b8', //violet
      main5: '#f7d7db', //blanc
      main6: '#fb8989',//orange pal
    },
    btn: {
      main: "#001137",
      main2: "#00255B",
      main3:'#fcaf3c',
    },
    secondary: {
      main: "#bd83b8",
      
      
    },
    default: {
      main: "black",
    },
    gradient: {
      // ba0578 jaune
      // 00255B teal
      //rose A0024E
      main: "linear-gradient(to right, #bd83b8, #bd83b8)", //bleu-actuel
      main3: "linear-gradient(to right, #1b3358, #473e66,  #bd83b8)", //white base
      main2: "linear-gradient(to top, #00255B , #00255B, #001137)",
      yellow: "#fff89a",//jaune
      blue: "#b4e4ff",//jaune
    }
  },//en palette

  typography: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '1.6',
    letterSpacing: '0.01071em',
    opacity: 1,
    textTransform: 'none',
    verticalAlign: 'middle',
    textDecoration: 'none',
    color: 'rgb(103, 116, 142)',
    btnText: {
      fontWeight: 700,
      color: theme.palette.common.white
    },
    
    actionBtnText:{
      fontWeight: 700,
      fontSize: 20,
      color: theme.palette.common.white
    },
    h2: {
      fontWeight: 800,
      fontStyle: "bold",
      fontSize: 50,
      wordSpacing: 1,
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: 20
    },
    h4: {
      fontWeight: 700,
      fontSize: 18
    },
    headerTitle: {
      // fontSize: 30,
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        fontSize: 30,
      },
    },
    actionTitle: {
      fontSize: 40,
      fontWeight: 700,
      [theme.breakpoints.down('lg')]: {
        fontSize: 30,
      },
    },
    h5: {

    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      // fontSize: 8,
    },
  },
  

  saveBtn: {
    backGroundColor: "#FF5F6D",
    color: "white",
    brderRadius: 50
  },
  cancelBtn: {
    backGroundColor: "#FFC371",
    color: "white",
    brderRadius: 50
  },
  editBtn: {
    backGroundColor: "#FF5F6D",
    color: "white",
    brderRadius: 50
  },
});

export default ClientTheme;