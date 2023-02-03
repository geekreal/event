import React from 'react';
import {BusinessOutlined, EventAvailable, 
    EventNote, EventRepeat, EventTwoTone, 
    Home, List, ListAlt, LocationCity, 
    LogoutTwoTone, ManageAccounts, Publish, 
    PublishSharp,
    Web
  }from "@mui/icons-material";
import { makeStyles } from '@mui/styles';


const Links = [
    { id: 0, label: "Tableau de board", link: "admin/Home", icon: <Home sx={{ color: "white" }}/> },
    { id: 1, type: "title", labelTitle: "ENTEPRISE / CLIENT" },

    { id: 2, label: "Clients", link: "/admin/client/client", icon: <ListAlt sx={{ color: "white" }}/> },
    { id: 3, type: "title", labelTitle: "EVENEMENT" },
    {
      id: 4,
      label: "Evènements",
      link: "/admin/evenement/liste",
      icon: <EventAvailable sx={{ color: "white" }} />,
    },
  ];

  export default Links;