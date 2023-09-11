import React, { useEffect, useState } from 'react'
import Style from './Style';
import { Fragment } from 'react';
import ReactLoading from 'react-loading';
import { Box, Button, Container, CssBaseline, Grid, IconButton, Paper, Stack, Table, Typography } from '@mui/material';
import ClientNavBar from '../../../components/client/navbar/ClientNavbar';
import { Link, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom';
import routes from '../../../routes/routes';
import Footer from '../../../components/client/footer/Footer';
import { AccountTree, CardGiftcard, DetailsRounded, GifTwoTone, PagesSharp, PriceChange, PriceCheck, QuestionAnswer, ReportOutlined, SettingsAccessibility } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SimpleBackdrop from '../../../components/loader/SimpleBackdrop';
import axios from 'axios';
import LinearLoading from '../../../components/loader/LinearLoading';
import { green, orange, red } from '@mui/material/colors';
import swal from 'sweetalert';
import CompteInfos from './CompteInfos';
import FaireDon from '../FaireDon';
import Reclamation from '../Reclamation';


const Dashboard = () => {
    const classes = Style();
    // const [loading, setLoading] = useState(false);

    // const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [showAction, setShowAction] = useState({
        don: false,
        reclamation: false,
        profile: false,
    });
    const [userStats, setUserStats] = useState({
        totalTicket : "",
        montantPaiement: "",
        paiementReussi : "",
    });
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [state, setState] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const [rowSelect, setRowSelect] = useState("");
    const history = useHistory();
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 2500);
    
        return () => {
        clearTimeout(timer)
        };
    }, []);

    // database perform
    useEffect(() => {
        const id = localStorage.getItem('redis_user_auth_id')

        axios.get(`api/user/${id}/events/myTickets`).then(res=> {
        //   console.log(res.data.events);
            if (res.status === 200) {
                setEventList(res.data.events)
            }
            setLoading(false);
        });

        axios.get(`api/user/${id}/events/stats`).then(res=> {
        //   console.log(res.data.events);
            if (res.status === 200) {
                setUserStats({...userStats, 
                    montantPaiement : USDollar.format(res.data.montantPaiement),
                    totalTicket: res.data.totalTicket,
                    paiementReussi: USDollar.format(res.data.paiementReussi)} );
            }
            setLoading(false);
        });
        
      }, [])

    // profile showing
    const showProfile = () => {
        setShowAction({...showAction, 
            profile: true,
            don: false,
            reclamation: false
        })
    }

    // reclamation
    const showReclamation = () => {
        setShowAction({...showAction, 
            profile: false,
            don: false,
            reclamation: true
        })
    }

    // reclamation
    const showGift = () => {
        setShowAction({...showAction, 
            profile: false,
            don: true,
            reclamation: false
        })
    }

    const renderDetailsButton = (cellValues) => {    
        return (
            <Stack direction="row" spacing={2}>
              <IconButton aria-label="Plus de détail" color='warning' size="large"
              onClick={(event) => {
                handleDetails(event, cellValues);
              }}>
                <DetailsRounded />
              </IconButton>
            </Stack>
        );
    };

    const handleDetails = (event, cellValues) => {
        event.preventDefault();
        const id = cellValues.row.id
        const thisClicked = event.currentTarget
        setState(true)
        swal("Detail", "Ok ! it "+id+" You get it !", "success");
        setState(false)
    
      };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'img', headerName: '', width: 0 },
        { field: 'nom', headerName: 'NOM', width: 200 },
        { field: 'ticket', headerName: 'TICKET', width: 200 },
        { field: 'montant', headerName: 'MONTANT', width: 100 },
        { field: 'paiement', headerName: 'PAIEMENT', width: 250 },
        { field: 'image', headerName: 'IMAGE', width: 100,
            renderCell: (params) => {
            return (<><img src={`${BASE_URL}${params.row.img}`} /></>);
            }
        },    
        { field: 'option', headerName: 'DETAILS', width: 300,
            renderCell: (cellValues) => {return renderDetailsButton(cellValues)}
        },
        
    ];

    let USDollar = new Intl.NumberFormat('en-US' , {
        style: 'currency',
        currency: 'XOF',
    });

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
             return {id: '##'+item.id , img : item.photo_cover , 
                nom: item.nom, ticket : item.nombre+' tickets '+item.typeTicket , montant: item.montant, 
                paiement: item.statusPaiement === 0 ? item.moyenPaiement+ ' - Non abouti' : item.moyenPaiement+' - Payer' ,
                date : item.date+" - "+item.heure}
        });
    }


  return (
    <div style={{
        margin: "70px"
    }}>
        {loading ? <Fragment>
        <div style={{
            opacity: 3,
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 9999,
            background: "linear-gradient(to top, #00255B , #00255B, #001137)",
            overflow: 'hidden',}}>
        <ReactLoading type='balls' color='#fff' />
        </div>
        </Fragment> :
        <Box>
            <CssBaseline sx={{ display: 'flex',}}/>
            <Box sx={{flexGrow: 1, marginBottom: 2 }}>
            {/* Navar */}
                <div>
                    <h1>
                        Tableau de bord
                    </h1>
                    <Grid container spacing={2} paddingBottom={2} 
                        // direction="row"
                        // justifyContent="space-between"
                        // alignItems="flex-start"
                    >
                        <Grid item className={classes.smCard} >
                        {/* <Link to="/admin/category-event/list" > */}
                        <Button
                            fullWidth
                            className={classes.AddEvent}
                            color="info"
                            variant="contained"
                            onClick={showGift}
                        >
                            <CardGiftcard />
                            Faire un don
                        </Button>
                        {/* </Link> */}
                        </Grid>

                        <Grid item className={classes.smCard} display='lex' justifyContent='flex-end'>
                            
                            {/* <Link to="" > */}
                            <Box display='flex' justifyContent="flex-end">
                            <Button
                            size="medium"
                            className={classes.AddEvent}
                            color="warning"
                            variant="contained"
                            onClick={showReclamation}
                            >
                            <ReportOutlined />
                            Faire une réclamation
                            </Button>
                            </Box>
                        {/* </Link> */}
                       
                        </Grid>

                        <Grid item className={classes.smCard} >
                        {/* <Link to=""> */}
                            <Button
                            size="medium"
                            className={classes.AddEvent}
                            color="success"
                            variant="contained"
                            onClick={showProfile}
                            >
                            <SettingsAccessibility />
                                Détail du compte
                            </Button>
                        {/* </Link> */}
                        </Grid>
                    </Grid>
                    <Paper elevation={2}>
                        {showAction.profile === true ? (<CompteInfos/>) : ''}
                        {showAction.don === true ? (<FaireDon/>) : ''}
                        {showAction.reclamation === true ? (<Reclamation/>) : ''}
                    </Paper>
                    {/* state */}
                    <Grid container spacing={3} display={'flex'} >
                        <Grid item sm={4}>
                            <Paper elevation={1} sx={{padding: 2, backgroundColor: green[600]}}>
                                <PagesSharp/>
                                <Typography variant='h4'>
                                    Tickets Payés
                                </Typography>
                                <Typography variant='h3' sx={{fontSize: 30,}}>
                                    {userStats.totalTicket}
                                </Typography>
                                <Typography variant='p'>
                                    Ici vous verrez le nombre total des tickets que vous avez payé sur IVENOS
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={4}>
                            <Paper elevation={1} sx={{padding: 2, backgroundColor: orange[400]}}>
                                <PriceChange/>
                            <Typography variant='h4'>
                                    Total paiement
                                </Typography>
                                <Typography variant='h3' sx={{fontSize: 30,}}>
                                    {userStats.montantPaiement}
                                </Typography>
                                <Typography variant='p'>
                                    Ici vous verrez le montant total des tickets que vous avez payé sur IVENOS
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={4}>
                            <Paper elevation={1} padding={2} sx={{padding: 2, backgroundColor: red[400]}}>
                                <PriceCheck/>
                                <Typography variant='h4'>
                                    Paiement réussi
                                </Typography>
                                <Typography variant='h3' sx={{fontSize: 30,}}>
                                    {userStats.paiementReussi}
                                </Typography>
                                <Typography variant='p'>
                                    Ici vous verrez le montant total des paiements que vous éffectué.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <p>
                        Tableau racapitulatif des tickets que vous avez commandé
                    </p>
                    
                    <div style={{ height: "500px", width: '100%' }}>
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
                            setRowSelect(ids);
                        }}/>
                    </div>
                </div>            
            </Box>
        </Box>
        }
    </div>
  )
}

export default Dashboard