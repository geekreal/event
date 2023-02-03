import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import makeStyle from "@mui/styles/makeStyles";
import { Link } from 'react-router-dom';
import { Avatar, Box, Breadcrumbs, Button, IconButton, Paper, Skeleton, Snackbar, Stack } from '@mui/material';
import { AddModeratorSharp, Delete, DeleteForever, DeleteOutline, Edit, HdrPlusOutlined, PersonAdd, PersonOutlineTwoTone, PlusOne, PlusOneOutlined, Refresh, RemoveRedEye, RemoveRedEyeOutlined, RemoveRedEyeSharp, Send, ViewList } from '@mui/icons-material';
import SimpleBackdrop from '../../../components/loader/SimpleBackdrop';
import routes from '../../../routes/routes';
import ClientInfosModal from '../../../components/modal/ClientInfosModal';
import swal from 'sweetalert';
import CircularProgress from '../../../components/loader/CircularProgress';
import LinearLoading from '../../../components/loader/LinearLoading';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ListClient = () => {

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
    const [clientsList, setClientsList] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [state, setState] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const history = useHistory();
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;


  const { vertical, horizontal, ouvert } = alertState;

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

      <Link to={`/admin/clients/edit/${cellValues.row.id}`}>
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

        axios.delete(`api/admin/clients/${id}/delete`).then(resp => {
            if (resp.data.status === 200) {
              setState(false)
              // setAlertMessage(`Ok ${resp.data.message}`)
              swal("Success", resp.data.message, "success");
              history.push("/admin/clients/list");
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
        axios.get(`api/admin/clients/${id}/infos`).then(resp => {
            if (resp.data.status === 200) {
                
                swal(`${resp.data.clients.nom}`, `${resp.data.clients.telephone} ${resp.data.clients.adresse} ${resp.data.clients.type_client_id}`, "success");
                setState(false)
                // ClientInfosModal({infos:resp.data.clients.nom , state:true});
            }
            else if (resp.data.status === 404) {
                swal("Infos", resp.data.message, "error");
                setState(false)
            } 
            // else {
            //     swal("Erreur", resp.data.message, "error");
            //     setLoading(false);
            //     history.push('/admin/clients/list');
            // }

        });
  };

  useEffect(() => {
    axios.get('api/admin/clients/list').then(res=> {
      console.log(res.data.clients);
        if (res.status === 200) {
            setClientsList(res.data.clients)
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
    { field: 'image', headerName: 'IMAGE', width: 100,
    renderCell: (params) => {
      console.log(params.row.img);
      return (<><img src={`${BASE_URL}${params.row.img}`} /></>);
    }
  },
    { field: 'email', headerName: 'EMAIL', width: 170 },
    { field: 'adresse', headerName: 'ADRESSE', width: 150 },
    { field: 'ville', headerName: 'VILLE', width: 150 },
    { field: 'telephone', headerName: 'TELEPHONE', width: 150 },
    { field: 'operation', headerName: 'OPERATION', width: 300,
    renderCell: (cellValues) => {return renderDeleteButton(cellValues)}
  },
  ];

  var rows = [];

  if(loading){

    return <SimpleBackdrop />;
    //<Skeleton className='content' variant="rectangular" width={210} height={118}/>
    // <SimpleBackdrop />;
    // <h4 className={classes.content}>Chargement des clients en cours</h4>;
  }else{
      // rows = [{id: "item.id" , designation: "item.libelle", dateCreation: "item.created_at" , operation: "item.id"}]
      rows = 
        clientsList.map((item) =>{
        return {id: item.id ,img: item.logo , nom: item.nom, email: item.email, adresse: item.adresse , ville: item.ville , telephone:item.telephone}
    });
  }

  // if (alertState) {
    // history.push("/admin/clients/list");
  //   return <Snackbar
  //       anchorOrigin={{ vertical : "top", horizontal :"center" }}
  //       open={alertState}
  //       onClose={handleCloseAlert}
  //       message={alertMessage}
  //       // key={vertical + horizontal}
  //     />
  // }

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
                to="/admin/clients/list"
                >
                Clients
            </Link>
            <Link
                underline="hover"
                color="text.primary"
                to="/admin/clients/list"
                aria-current="page"
            >
                Listes des clients
            </Link>
            </Breadcrumbs>
          </div>
        </Paper>
       
        <Stack direction="row" spacing={3} className='breadPaper' background-color="#fff" >
          <Link to="/admin/clients/create">
            <Button color='primary' size='large' variant="contained" endIcon={<PersonAdd/>}>
                Ajouter de nouveaux clients 
            </Button>
          </Link>
          <Link to="/admin/clients/list">
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
          components={{ Toolbar: GridToolbar }}/>
      </div>
    </div>
  )
}

export default ListClient