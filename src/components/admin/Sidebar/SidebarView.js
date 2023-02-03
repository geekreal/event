import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  withStyles } from "@mui/material";
import {BusinessOutlined, EventAvailable, 
  EventNote, EventRepeat, EventTwoTone, 
  Home, List, ListAlt, LocationCity, 
  LogoutTwoTone, ManageAccounts, Publish, 
  PublishSharp
} from "@mui/icons-material";
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink/SidebarLinkContainer';
import Dot from './components/Dot';

const structure = [
  { id: 0, label: "Dashboard", link: "admin/Home", icon: <Home /> },
  { id: 1, type: "divider" },
  { id: 2, type: "title", label: "ENTEPRISE / CLIENT" },
  {
    id: 3,
    label: "Ajouter un client",
    link: "admin/entreprise/ajouter",
    icon: <BusinessOutlined />,
  },
  { id: 4, label: "Liste des clients", link: "/admin/client/client", icon: <ListAlt /> },
  
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "EVENEMENT" },
  {
    id: 7,
    label: "Publier un évenement",
    link: "/admin/evenement/publier",
    icon: <EventRepeat />,
  },
  {
    id: 8,
    label: "Liste des évenements",
    link: "/admin/evenement/liste",
    icon: <EventAvailable />,
  },
  {
    id: 9,
    label: "Catégorie d'évènement",
    link: "/admin/evenement/types",
    icon: <EventNote />,
  },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "COMPTE" },
  { id: 12, label: "Administrateur", link: "/admin/compte", icon: <ManageAccounts /> },
  { id: 13, label: "Déconnexion", link: "/admin/déconnexion", icon: <LogoutTwoTone /> },
  { id: 14, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  { id: 15, type: "divider" },
  { id: 16, type: "title", label: "SUPPORT" },
  {
    id: 17,
    label: "Contacter le webmaster",
    link: "",
    icon: <Dot size="small" color="warning" />,
  },
  {
    id: 18,
    label: "Starred",
    link: "",
    icon: <Dot size="small" color="primary" />,
  },
  {
    id: 19,
    label: "Background",
    link: "",
    icon: <Dot size="small" color="secondary" />,
  },
];
const SidebarView = ({ classes, theme, toggleSidebar, isSidebarOpened, isPermanent, location }) => {
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.mobileBackButton}>
        <IconButton
          onClick={toggleSidebar}
        >
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />)}
      </List>
    </Drawer>
  );
}

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    top: theme.spacing.unit * 8,
    [theme.breakpoints.down("sm")]: {
      top: 0,
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * .5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * .625,
    },
    [theme.breakpoints.up("md")]: {
      display: 'none',
    }
  }
});

export default withStyles(styles, { withTheme: true })(SidebarView);
