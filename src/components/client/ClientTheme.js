import { createTheme } from "@mui/material";
import { blue, color, green, lightBlue } from "@mui/material/colors";
import { theme } from "../admin/theme";

import Helvetica from './fonts/Helvetica.ttf';
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
  palette: {
    primary: {
      main: "#ba0578",
      main2: "#118678",
    },
    btn: {
      main: "#ba0578",
      main2: "#118678",
      main3:'#fcaf3c',
    },
    secondary: {
      main: "#ba0578",
      
      
    },
    default: {
      main: "black",
    },
    gradient: {
      // ba0578 jaune
      // 118678 teal
      main: "linear-gradient(to right, #ba0578, #ba0578)", //jaune
      main2: "linear-gradient(to right, #118678, #118678)", //teal
      main3: "linear-gradient(to top, #014255 , #014255, #ba0578)",
      main4: "#fcaf3c",//jaune
    }
  },//en palette

  typography: {
    fontFamily: ['"almarai", sans serif'].join(','),
    color: "white",
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
      fontSize: '2.2rem'
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem'
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