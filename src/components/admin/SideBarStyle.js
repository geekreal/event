import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from './theme';

const SideBarStyle = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: 'inherit',
    "&:hover, &:focus": {
      backgroundColor: "white",
    },
  },
  externalLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none'
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkText: {
    // padding: ,
    // marginLeft: -15,
    // color: theme.palette.text.secondary + "CC",
    // transition: theme.transitions.create(["opacity", "color"]),
    // fontSize: 10,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    // paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    padding: theme.spacing(1),
  },
  dividerTop: {
    // paddingTop: theme.spacing(2),
  },
  dividerBottom: {
    paddingTop: theme.spacing(2),
  },
  section: {
      paddingTop : theme.spacing(1),
      paddingBottom : theme.spacing(1)
  },
  sectionText: {
    paddingTop : theme.spacing(-4),
    paddingLeft : theme.spacing(2),
    color: "white",
    opacity: 0.2,
    // fontWeight: "500px",
    // paddingBottom : theme.spacing(1)
},
uiList: {
    "&:hover, &:focus": {
        backgroundColor: "white",
      },
},
list: {
    fontFamily: `"Helvetica"`,
    fontSize: 14,
    height: "100%",
    color: "white",
    background: "#2196F3",  /* fallback for old browsers */
    background: "linear-gradient(to right, #240b36 ,#c31432)",
     /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
}));
export default SideBarStyle;
