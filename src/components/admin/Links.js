import React from 'react';
import {BusinessOutlined, Code, EventAvailable, 
    EventNote, EventRepeat, EventTwoTone, 
    Home, List, ListAlt, ListRounded, LocationCity, 
    LogoutTwoTone, ManageAccounts, People, PeopleAltRounded, Person2, Person3, PersonSearch, PersonSharp, Publish, 
    PublishSharp,
    QrCode2,
    Web
  }from "@mui/icons-material";
import { makeStyles } from '@mui/styles';


const Links = [
    { id: 0, label: "Tableau de board", link: "/admin/home/", icon: <Home sx={{ color: "white" }}/> },
    // { id: 1, type: "divider"  },
    { id: 1, type: "title", labelTitle: "ENTEPRISE / CLIENT" },
    // {
    //   id: 2,
    //   label: "Ajouter un client",
    //   link: "admin/entreprise/ajouter",
    //   icon: <BusinessOutlined />,
    // },
    { id: 2, label: "Clients", link: "/admin/clients/list", icon: <ListAlt sx={{ color: "white" }}/> },
    // { id: 5, type: "divider"  },
    { id: 3, type: "title", labelTitle: "EVENEMENT" },
    // {
    //   id: 5,
    //   label: "Evènement",
    //   link: "/admin/evenement/publier",
    //   icon: <EventRepeat />,
    // },
    {
      id: 4,
      label: "Evènements",
      link: "/admin/events/list/",
      icon: <EventAvailable sx={{ color: "white" }} />,
    },
    { id: 5, label: "Guest", link: "/admin/invites/list", icon: <PeopleAltRounded sx={{ color: "white" }}/> },
    { id: 6, label: "Ticket", link: "/admin/tickets/list", icon: <QrCode2 sx={{ color: "white" }}/> },

    // {
    //   id: 7,
    //   label: "Catégorie d'évènement",
    //   link: "/admin/evenement/types",
    //   icon: <EventNote />,
    // },
    // { id: 10, type: "divider"  },
    { id: 7, type: "title", labelTitle: "COMPTE" },
    { id: 8, label: "Administrateur", link: "/admin/compte", icon: <ManageAccounts sx={{ color: "white" }}/> },
    // { id: 10, label: "Déconnexion", link: "/admin/déconnexion", icon: <LogoutTwoTone /> },
    // { id: 15, type: "divider"  },
    { id: 9, type: "title", labelTitle: "SUPPORT" },
    {
      id: 10,
      label: "Webmaster",
      link: "/",
      icon: <Web sx={{ color: "white" }} />,
    },
    
    {
      id: 11,
      label: "Site web",
      link: "/",
      icon: <LogoutTwoTone sx={{ color: "white" }}/>,
    },
  ];

  export default Links;