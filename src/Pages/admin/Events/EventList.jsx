import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import makeStyle from "@mui/styles/makeStyles";
import { Link } from 'react-router-dom';
import { Avatar, Box, Breadcrumbs, Button, IconButton, Paper, Skeleton, Snackbar, Stack } from '@mui/material';
import { AddModeratorSharp, AirplaneTicket, CardTravel, Celebration, Delete, DeleteForever, DeleteOutline, Edit, EventSeat, HdrPlusOutlined, PeopleAltTwoTone, PersonAdd, PersonOutlineTwoTone, PlusOne, PlusOneOutlined, QrCode, QrCode2, Refresh, RemoveRedEye, RemoveRedEyeOutlined, RemoveRedEyeSharp, Send, ViewList } from '@mui/icons-material';
import SimpleBackdrop from '../../../components/loader/SimpleBackdrop';
import routes from '../../../routes/routes';
import ClientInfosModal from '../../../components/modal/ClientInfosModal';
import swal from 'sweetalert';
import CircularProgress from '../../../components/loader/CircularProgress';
import LinearLoading from '../../../components/loader/LinearLoading';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EventList = () => {

  const useStyles = makeStyle((theme) => ({
    container: {},
    content: {
      marginTop: theme.spacing(6),
    },
    smCard: {
      padding: theme.spacing(2),
    },
  }));

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [state, setState] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const [rowSelect, setRowSelect] = useState("");
    const history = useHistory();
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;

  const handleClickAlert = (newState) => () => {
    setAlertState(true);
  };

  const handleCloseAlert = () => {
    setAlertState(false);
  };

  const renderDeleteButton = (cellValues) => {
    return (
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="supprimer" color='error' size="large"
        onClick={(event) => {
          handleDelete(event, cellValues);
        }}>
          <DeleteForever />
        </IconButton>

      <Link to={`/admin/events/edit/${cellValues.row.id}`}>
        <IconButton variant="contained" aria-label="Editer" color='primary' size="large"
        onClick={(event) => {
          handleEdit(event, cellValues);
        }}>
          <Edit />
        </IconButton>
      </Link>
        

        <IconButton variant="contained" aria-label="Information" color='secondary'size="large"
          onClick={(event) => {
            handleInfo(event, cellValues);
          }}>
          <RemoveRedEye />
        </IconButton>
      </Stack>
    );
  }
  
  const handleDelete = (event, cellValues) => {
    event.preventDefault();
    const id = cellValues.row.id
    const thisClicked = event.currentTarget
    thisClicked.innerText = "..."
    setState(true)

        axios.delete(`api/admin/events/${id}/delete`).then(resp => {
            if (resp.data.status === 200) {
              setState(false)
              // setAlertMessage(`Ok ${resp.data.message}`)
              swal("Success", resp.data.message, "success");
              history.push("/admin/events/list");
            }
            else if (resp.data.status === 404) {

                swal("Infos", resp.data.message, "error");
                setState(false)
                setAlertState(false);

            } else{

              swal("Infos", resp.data.message, "error");
              setState(false)
              setAlertState(false);

            }
        });
    

  };

  const handleEdit = (event, cellValues) => {
    console.log(cellValues.row.id);
  };

  const handleInfo = (event, cellValues) => {    
    console.log(cellValues.row.id);
    const id =cellValues.row.id;
    setState(true)
        axios.get(`api/admin/events/${id}/infos`).then(resp => {
            if (resp.data.status === 200) {
                
                swal(`${resp.data.events.nom}`, `${resp.data.events.lieu} ${resp.data.events.pays} ${resp.data.events.date}`, "success");
                setState(false)
                // ClientInfosModal({infos:resp.data.events.nom , state:true});
            }
            else if (resp.data.status === 404) {
                swal("Infos", resp.data.message, "error");
                setState(false)
            } 
            // else {
            //     swal("Erreur", resp.data.message, "error");
            //     setLoading(false);
            //     history.push('/admin/events/list');
            // }

        });
  };

  useEffect(() => {
    axios.get('api/admin/events/list').then(res=> {
      console.log(res.data.events);
        if (res.status === 200) {
            setEventList(res.data.events)
        }
        setLoading(false);
    });
  }, [])
  

  const LoadingSkeleton = () => (
      <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} />
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'img', headerName: 'IMG', width: 0 },
    { field: 'nom', headerName: 'NOM', width: 170 },
    { field: 'createur', headerName: 'CREATEUR', width: 170 },
    { field: 'ticket', headerName: 'TICKET', width: 50 },
    { field: 'status', headerName: 'STATUS', width: 50 },
    { field: 'lieu', headerName: 'LIEU', width: 170 },
    { field: 'date', headerName: 'DATE HEURE', width: 250 },
    { field: 'description', headerName: 'DESCRIPTION', width: 200 },
    { field: 'image', headerName: 'IMAGE', width: 100,
    renderCell: (params) => {
      console.log(params.row.img);
      return (<><img src={`${BASE_URL}${params.row.img}`} /></>);
    }
  },
    { field: 'operation', headerName: 'OPERATION', width: 300,
    renderCell: (cellValues) => {return renderDeleteButton(cellValues)}
  },
  ];

  var rows = [];

  if(loading){

    return <SimpleBackdrop />;
    //<Skeleton className='content' variant="rectangular" width={210} height={118}/>
    // <SimpleBackdrop />;
    // <h4 className={classes.content}>Chargement des events en cours</h4>;
  }else{
      // rows = [{id: "item.id" , designation: "item.libelle", dateCreation: "item.created_at" , operation: "item.id"}]
      rows = 
        eventList.map((item) =>{
        return {id: item.id , img : item.photo_cover , createur: item.client, nom: item.nom,  description: item.description , status: item.status , ticket : item.ticket , lieu: item.lieu , date : item.date+" à "+item.heure}
    });
  }

  // if (alertState) {
    // history.push("/admin/events/list");
  //   return <Snackbar
  //       anchorOrigin={{ vertical : "top", horizontal :"center" }}
  //       open={alertState}
  //       onClose={handleCloseAlert}
  //       message={alertMessage}
  //       // key={vertical + horizontal}
  //     />
  // }

  // click sur cration de ticket
  const handleTicketButton = ()=>{
    history.push('/admin/event/ticket/create');

  }

  // click sur ajouter des invités
  const handleGuestButton = ()=>{
    if (rowSelect === "") {
      swal("Infos", "Selectionnez un évènement", "info");
    }else{
      history.push(`/admin/event/${rowSelect}/guest/add`);
    }
  }

  return (
    <div className="content">
        <Paper className='breadPaper' elevation={1} background-color="#fff">
          <div role="presentation" className={classes.breadcrumbs} >
            <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/admin/home">
                Accueil
            </Link>
            <Link
                underline="hover"
                color="inherit"
                to="/admin/events/list"
                >
                Evènement
            </Link>
            <Link
                underline="hover"
                color="text.primary"
                to="/admin/events/list"
                aria-current="page"
            >
                Listes des Evènement
            </Link>
            </Breadcrumbs>
          </div>
        </Paper>
       
        <Stack direction="row" spacing={3} className='breadPaper' background-color="#fff" >
          <Link to="/admin/events/create">
            <Button color='primary' size='large' variant="contained" endIcon={<Celebration/>}>
                Créer un évènement
            </Button>
          </Link>

          {/* <Link to="#"> */}
            <Button onClick={handleTicketButton} color='secondary' size='large' variant="contained" endIcon={<QrCode2/>}>
                Créer des tickets
            </Button>
          {/* </Link> */}

          <Button onClick={handleGuestButton} color='warning' size='large' variant="contained" endIcon={<PeopleAltTwoTone/>}>
                Ajouter des invités
            </Button>

          <Link to="/admin/events/list">
            <Button color='success' size='large' variant="contained" >
                <Refresh/> 
            </Button>  
          </Link>
          
        </Stack> 

        <div style={{ height: 500, width: '100%' }}>
          {state ? <LinearLoading/> : ""}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[10]}
          checkboxSelection
          componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
          }}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.id)
            );
            console.log("Table id :", ids);
            setRowSelect(ids);
          }}
          />
      </div>
    </div>
  )
}

export default EventList