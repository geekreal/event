import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@mui/material";
import { BusinessOutlined, EventAvailable, 
  EventNote, EventRepeat, EventTwoTone, 
  Home, ListAlt, LocationCity, 
  LogoutTwoTone, ManageAccounts, Publish, 
  PublishSharp, ArrowBackOutlined as ArrowBackIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { withRouter} from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../context/LayoutContext";

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
  { id: 14, label: "FAQ", link: "https://flatlogic.com/forum", icon:'' },
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

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);