import React from 'react';

import Dashboard from '../Pages/admin/dahboard';
import CreateEventCategory from '../Pages/admin/EventCategories/CreateEventCategory';
import AdminEvents from '../Pages/admin/Events/List';

// Auth-admin
import Login from '../Pages/admin/auth/Login';
import Register from '../Pages/admin/auth/Register';
import Profile from '../Pages/admin/Profile';
import MasterHome from '../components/admin/MasterHome';
import ListEventCategory from '../Pages/admin/EventCategories/ListEventCategory'

import CreateClient from '../Pages/admin/Clients/CreateClient';
import ListClient from '../Pages/admin/Clients/List';

import CreateTypeClient from '../Pages/admin/TypeClients/CreateTypeClient';
import ListTypeClient from '../Pages/admin/TypeClients/List';
import EditClient from '../Pages/admin/Clients/EditClient';

import CreateInvites from '../Pages/admin/Events/Invites/CreateInvites';
import EditInvites from '../Pages/admin/Events/Invites/EditInvites';
import ListInvites from '../Pages/admin/Events/Invites/InvitesList';

import CreateEvent from '../Pages/admin/Events/CreateEvent';
import EventList from '../Pages/admin/Events/EventList';
import EditEvent from '../Pages/admin/Events/EditEvent';

import IndexTicket from '../Pages/admin/Events/Tickets/IndexTicket';
import Select from '../Pages/admin/Events/Tickets/Select';
import AddGuest from '../Pages/admin/Events/AddGuest';


// Client 


// routes

const routes = [ 
    {path: "/", exact: true,  name: 'Accueil'},
    {path: "/admin", exact: true,  name: 'Admin'},
    {path: "/admin/home", exact: true, name: 'AdminHome', component: Dashboard},
    {path: "/admin-login", exact: true, name: 'AdminLogin' , component: Login},
    {path: "/admin-register", exact: true, name: 'AdminRegister' , component: Register},
    {path: "/admin-profile", exact: true, name: 'AdminProfile' , component: Profile},

    // events
    {path: "/admin/events/edit/:id", exact: true, name: 'AdminEditEvent', component: EditEvent},
    {path: "/admin/events/list", exact: true, name: 'AdminEvents', component: EventList},
    {path: "/admin/events/create", exact: true, name: 'CreateEvent', component: CreateEvent},

    {path: "/admin/event/:id/guest/add", exact: true, name: 'AddGuest', component: AddGuest},

    // {path: "/admin/event/guest/select", exact: true, name: 'Select', component: Select},

    {path: "/admin/category-event/create", exact: true,  name: 'CategoryEventCreate', component: CreateEventCategory},
    {path: "/admin/category-event/list", exact: true,  name: 'ListEventCategory', component: ListEventCategory},

    {path: "/admin/clients/create", exact: true,  name: 'CreateClient', component: CreateClient},
    {path: "/admin/clients/list", exact: true,  name: 'ListClient', component: ListClient},
    {path: "/admin/clients/edit/:id", exact: true,  name: 'EditClient', component: EditClient},

    {path: "/admin/type/clients/create", exact: true,  name: 'CreateTypeClient', component: CreateTypeClient},
    {path: "/admin/type/clients/list", exact: true,  name: 'ListTypeClient', component: ListTypeClient},


    {path: "/admin/events/invites/create", exact: true,  name: 'CreateInvites', component: CreateInvites},
    {path: "/admin/events/invites/list", exact: true,  name: 'ListInvites', component: ListInvites},
    {path: "/admin/events/invites/edit/:id", exact: true,  name: 'EditInvites', component: EditInvites},

    {path: "/admin/event/ticket/create", exact: true,  name: 'CreateTicket', component: IndexTicket},



  ];

  
export default routes;